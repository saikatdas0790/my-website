#!/bin/bash
# Ansible Vault Initialization Script
# Guides you through setting up Ansible Vault for the first time.
# Run from the ansible/ directory: cd ansible && ./init_vault.sh

set -e

echo "========================================"
echo "Ansible Vault Initialization"
echo "========================================"
echo

# Check if we're in the ansible directory
if [ ! -f "ansible.cfg" ]; then
    echo "❌ Error: Must run from ansible/ directory"
    echo "   cd ansible && ./init_vault.sh"
    exit 1
fi

# Check if vault is already initialized
if [ -f ".vault_pass" ] && [ -f "vars/vault.yml" ]; then
    echo "⚠️  Vault appears to be already initialized"
    echo "   Files exist: .vault_pass, vars/vault.yml"
    echo
    read -p "Do you want to reinitialize? This will backup existing files. (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 0
    fi

    # Backup existing files
    timestamp=$(date +%Y%m%d_%H%M%S)
    [ -f ".vault_pass" ] && mv .vault_pass ".vault_pass.backup_${timestamp}"
    [ -f "vars/vault.yml" ] && mv vars/vault.yml "vars/vault.yml.backup_${timestamp}"
    echo "✓ Existing files backed up"
    echo
fi

# Step 1: Create vault password
echo "Step 1: Create Vault Password"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Enter a strong password for encrypting secrets."
echo "This password will be stored in .vault_pass (gitignored)."
echo
read -s -p "Vault password: " vault_pass
echo
read -s -p "Confirm password: " vault_pass_confirm
echo

if [ "$vault_pass" != "$vault_pass_confirm" ]; then
    echo "❌ Passwords don't match. Aborting."
    exit 1
fi

if [ ${#vault_pass} -lt 8 ]; then
    echo "❌ Password too short. Use at least 8 characters."
    exit 1
fi

# Save password
echo "$vault_pass" > .vault_pass
chmod 600 .vault_pass
echo "✓ Vault password saved to .vault_pass"
echo

# Step 2: Cloudflare API Token
echo "Step 2: Cloudflare API Token"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Create one at: https://dash.cloudflare.com/profile/api-tokens"
echo "Required permissions: Zone:DNS:Edit, Zone:Zone:Read"
echo
read -s -p "Cloudflare API Token: " cloudflare_api_token
echo

if [ -z "$cloudflare_api_token" ]; then
    echo "❌ API token cannot be empty"
    exit 1
fi

# Step 3: Cloudflare Zone ID (public — written to vars/main.yml, not the vault)
echo
echo "Step 3: Cloudflare Zone ID"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Find it at: https://dash.cloudflare.com → saikat.dev → Overview → right sidebar"
echo "(This is a public identifier — it will be stored in vars/main.yml, not encrypted)"
echo
read -p "Cloudflare Zone ID: " cloudflare_zone_id

if [ -z "$cloudflare_zone_id" ]; then
    echo "❌ Zone ID cannot be empty"
    exit 1
fi

# Step 4: Cloudflare Account ID (public — written to vars/main.yml, not the vault)
echo
echo "Step 4: Cloudflare Account ID"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Find it at: https://dash.cloudflare.com → saikat.dev → Overview → right sidebar"
echo "(This is a public identifier — it will be stored in vars/main.yml, not encrypted)"
echo
read -p "Cloudflare Account ID: " cloudflare_account_id

if [ -z "$cloudflare_account_id" ]; then
    echo "❌ Account ID cannot be empty"
    exit 1
fi

# Step 5: Write public IDs to vars/main.yml and create encrypted vault
echo
echo "Step 5: Creating Encrypted Vault"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Write the plaintext public values into main.yml
cat > vars/main.yml << EOF
---
# Plaintext vars committed to version control.
# Only the API token is sensitive; zone_id and account_id are public identifiers.

# Cloudflare Configuration
cloudflare_api_token: "{{ vault_cloudflare_api_token }}"
cloudflare_zone_id: "$cloudflare_zone_id"
cloudflare_account_id: "$cloudflare_account_id"
EOF
echo "✓ Public IDs written to vars/main.yml"

# Only the API token belongs in the vault
cat > vars/vault.yml << EOF
---
# Encrypted secrets - actual values
# This file is encrypted with ansible-vault

vault_cloudflare_api_token: "$cloudflare_api_token"
EOF

# Encrypt the vault file
ansible-vault encrypt vars/vault.yml --vault-password-file=.vault_pass
echo "✓ Encrypted vars/vault.yml"
echo

# Step 6: Generate .env
echo "Step 6: Testing Configuration"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Running playbook to generate .env file..."
echo

if ansible-playbook setup_env.yml; then
    echo
    echo "========================================"
    echo "✓ Vault Initialization Complete!"
    echo "========================================"
    echo
    echo "Created files:"
    echo "  ✓ .vault_pass (gitignored)"
    echo "  ✓ vars/main.yml (zone_id + account_id, commit this)"
    echo "  ✓ vars/vault.yml (encrypted API token, commit this)"
    echo "  ✓ ../.env (generated, gitignored)"
    echo
    echo "Next steps:"
    echo "  1. Commit the encrypted vault: git add vars/vault.yml && git commit"
    echo "  2. Add ANSIBLE_VAULT_PASSWORD secret to GitHub repo settings"
    echo
    echo "Vault management commands:"
    echo "  View secrets:    ansible-vault view vars/vault.yml"
    echo "  Edit secrets:    ansible-vault edit vars/vault.yml"
    echo "  Regenerate .env: ansible-playbook setup_env.yml"
    echo
    echo "See ansible/README.md for more information."
    echo "========================================"
else
    echo
    echo "❌ Playbook execution failed."
    echo "   Check the error messages above."
    echo "   You may need to install Ansible: sudo apt-get install ansible"
    exit 1
fi
