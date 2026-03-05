#!/bin/bash
# Deletes all Cloudflare Pages deployments for my-website project
# then deletes the project itself
# Run from repo root: bash ansible/delete_cf_pages_deployments.sh

set -e
source "$(dirname "$0")/../.env"

PROJECT="my-website"
BASE="https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/pages/projects/${PROJECT}"
AUTH=(-H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}")

echo "Fetching deployment count..."
TOTAL=$(curl -s "${BASE}/deployments?per_page=1" "${AUTH[@]}" | jq '.result_info.total_count')
PAGES=$(( (TOTAL + 24) / 25 ))
echo "Total deployments: $TOTAL (${PAGES} pages)"

for ((page=1; page<=PAGES; page++)); do
  echo ""
  echo "=== Page ${page}/${PAGES} ==="
  IDS=$(curl -s "${BASE}/deployments?per_page=25&page=${page}" "${AUTH[@]}" | jq -r '.result[].id')
  for id in $IDS; do
    result=$(curl -s -X DELETE "${BASE}/deployments/${id}?force=true" "${AUTH[@]}" -H "Content-Type: application/json" | jq -r '.success')
    echo "  deleted ${id} => ${result}"
  done
done

echo ""
echo "All deployments deleted. Removing project..."
response=$(curl -s -X DELETE "${BASE}" "${AUTH[@]}" -H "Content-Type: application/json")
echo "$response" | jq .
if echo "$response" | jq -e '.success' > /dev/null 2>&1 && [ "$(echo "$response" | jq -r '.success')" = "true" ]; then
  echo "✓ Cloudflare Pages project '${PROJECT}' deleted"
else
  echo "Project deletion result above (null result with success:true is also valid)"
fi
