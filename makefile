# Default environment
ENV ?= local

# Colors for terminal output
GREEN := \033[0;32m
NC := \033[0m # No Color

.PHONY: help install test format phpstan clear cache-clear migrate seed

# Show help
help:
 @echo "Available commands:"
 @echo "${GREEN}make help${NC}          - Show this help"
 @echo "${GREEN}make format${NC}        - Format code using PHP-CS-Fixer"
 @echo "${GREEN}make phpstan${NC}       - Run PHPStan analysis"
 @echo "${GREEN}make clear${NC}         - Clear all caches"
 @echo "${GREEN}make tuo${NC}         - Clear all caches"

# Format code
format:
 @echo "${GREEN}Formatting code...${NC}"
 ./vendor/bin/php-cs-fixer fix -vvv --show-progress=dots

# PHPStan
phpstan:
 @echo "${GREEN}Running PHPStan...${NC}"
 ./vendor/bin/phpstan analyze --memory-limit=1G

# Clear all caches
clear:
 @echo "${GREEN}Clearing caches...${NC}"
 php artisan cache:clear
 php artisan config:clear
 php artisan route:clear
 php artisan view:clear
 composer dump-autoload
 @echo "✅All caches cleared!"

tuo:
 @echo "${GREEN}Running PHPStan... TUO MIN ZIN 2${NC}"
