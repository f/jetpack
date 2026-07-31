#!/usr/bin/env bash

set -euo pipefail

plugin_directory="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
plugin_slug="jetpack-developer-docs-site"
plugin_version="$(sed -n 's/^ \* Version: \(.*\)$/\1/p' "${plugin_directory}/${plugin_slug}.php")"
output_path="${1:-${plugin_directory}/build/${plugin_slug}-${plugin_version}.zip}"

if [[ "${output_path}" != /* ]]; then
	output_path="${PWD}/${output_path}"
fi

output_directory="$(dirname "${output_path}")"
staging_directory="$(mktemp -d)"
archive_root="${staging_directory}/${plugin_slug}"

cleanup() {
	rm -rf "${staging_directory}"
}
trap cleanup EXIT

mkdir -p "${archive_root}/blocks/product-carousel" "${output_directory}"

install -m 0644 "${plugin_directory}/${plugin_slug}.php" "${archive_root}/"
install -m 0644 "${plugin_directory}/readme.txt" "${archive_root}/"
install -m 0644 "${plugin_directory}/blocks/product-carousel/editor.css" "${archive_root}/blocks/product-carousel/"
install -m 0644 "${plugin_directory}/blocks/product-carousel/editor.js" "${archive_root}/blocks/product-carousel/"
install -m 0644 "${plugin_directory}/blocks/product-carousel/style.css" "${archive_root}/blocks/product-carousel/"
install -m 0644 "${plugin_directory}/blocks/product-carousel/utils.js" "${archive_root}/blocks/product-carousel/"
install -m 0644 "${plugin_directory}/blocks/product-carousel/view.js" "${archive_root}/blocks/product-carousel/"

find "${archive_root}" -exec touch -t 202001010000 {} +
rm -f "${output_path}"

(
	cd "${staging_directory}"
	LC_ALL=C find "${plugin_slug}" -type f -print | LC_ALL=C sort | zip -X -q "${output_path}" -@
)

shasum -a 256 "${output_path}"
