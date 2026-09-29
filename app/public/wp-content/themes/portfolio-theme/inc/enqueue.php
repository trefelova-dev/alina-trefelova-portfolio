<?php
/**
 * Alina Trefelova Portfolio
 * © 2026 Alina Trefelova / ATcode. All rights reserved.
 * 
 * Подключение стилей и скриптов темы с динамическим сбросом кэша.
 */

function portfolio_enqueue_scripts() {
    wp_enqueue_style(
        'portfolio-fonts',
        get_template_directory_uri() . '/assets/css/fonts.css',
        [],
        null
    );
    
    wp_enqueue_style(
        'portfolio-main-style', 
        get_stylesheet_uri(), 
        [], 
        filemtime(get_stylesheet_directory() . '/style.css') 
    );

    wp_enqueue_style(
        'portfolio-style',
        get_template_directory_uri() . '/assets/css/main.css',
        [],
        filemtime(get_template_directory() . '/assets/css/main.css') 
    );

    wp_enqueue_script(
        'portfolio-main',
        get_template_directory_uri() . '/assets/js/main.js',
        [],
        null,
        true
    );

    wp_enqueue_script(
        'portfolio-projects-filter',
        get_template_directory_uri() . '/assets/js/projects-filter.js',
        array(),
        null,
        true
    );
}
add_action('wp_enqueue_scripts', 'portfolio_enqueue_scripts');