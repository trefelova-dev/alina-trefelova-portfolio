<?php
/**
 * Plugin Name: Portfolio Blocks
 * Description: Кастомные блоки на React + Tailwind для портфолио
 * Version: 1.0.0
 * Author: Alina Trefelova
 */

if (!defined('ABSPATH')) {
    exit;
}

function portfolio_register_all_blocks() {
    $build_path = __DIR__ . '/build';

    if (file_exists($build_path)) {
        $folders = glob($build_path . '/*', GLOB_ONLYDIR);
        foreach ($folders as $folder) {
            register_block_type($folder);
        }
    }
}
add_action('init', 'portfolio_register_all_blocks');