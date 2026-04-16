#!/usr/bin/env ruby
# Validates profile JSON and Jekyll build after profile data edits.

require "json"
require "open3"

input = STDIN.read

PROFILE_FILES = [
  "_data/profile.json",
  "_data/profile.example.json"
].freeze

json_change = input.include?("_data/profile.json") || input.include?("_data/profile.example.json")
tool_change = input.match?(/apply_patch|create_file|str_replace|insert|rename|delete|edit/i)

# Fast no-op when unrelated tools/files are involved.
unless json_change && tool_change
  exit 0
end

errors = []

PROFILE_FILES.each do |path|
  next unless File.exist?(path)

  begin
    JSON.parse(File.read(path))
  rescue JSON::ParserError => e
    errors << "Invalid JSON in #{path}: #{e.message}"
  end
end

if errors.empty?
  stdout, stderr, status = Open3.capture3("bundle exec jekyll build")
  unless status.success?
    errors << "Jekyll build failed after profile JSON edit."
    errors << stderr.strip unless stderr.to_s.strip.empty?
    errors << stdout.strip unless stdout.to_s.strip.empty?
  end
end

if errors.any?
  message = errors.join("\n")
  puts({
    decision: "block",
    reason: message,
    systemMessage: "Profile JSON validation failed. Fix JSON/schema/build issues before continuing."
  }.to_json)
  exit 2
end

puts({
  decision: "continue",
  systemMessage: "Profile JSON validation passed (JSON parse + jekyll build)."
}.to_json)
exit 0
