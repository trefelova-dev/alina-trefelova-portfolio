<?php
function register_projects_post_type() {
    register_post_type('projects', [
        'labels' => [
            'name'          => 'Проекты',
            'singular_name' => 'Проект',
            'add_new_item'  => 'Добавить проект',
            'edit_item'     => 'Редактировать проект',
            'all_items'     => 'Все проекты',
        ],
        'public'       => true,
        'has_archive'  => true,
        'rewrite'      => ['slug' => 'projects'],
        'supports'     => ['title', 'editor', 'thumbnail', 'excerpt'],
        'show_in_rest' => true,
    ]);
}
add_action('init', 'register_projects_post_type');

function register_project_technology_taxonomy() {
    register_taxonomy('project_technology', ['projects'], [
        'labels' => [
            'name'          => 'Технологии',
            'singular_name' => 'Технология',
            'add_new_item'  => 'Добавить технологию',
            'edit_item'     => 'Редактировать технологию',
            'all_items'     => 'Все технологии',
        ],
        'public'            => false,
        'publicly_queryable'=> false,
        'show_ui'           => true,
        'show_in_menu'      => true,
        'show_admin_column' => true,
        'show_in_rest'      => true,
        'hierarchical'      => true,
        'query_var'         => false,
        'rewrite'           => false,
    ]);
}
add_action('init', 'register_project_technology_taxonomy');

function register_project_type_taxonomy() {
    register_taxonomy('project_type', ['projects'], [
        'labels' => [
            'name'          => 'Типы проекта',
            'singular_name' => 'Тип проекта',
            'add_new_item'  => 'Добавить тип проекта',
            'edit_item'     => 'Редактировать тип проекта',
            'all_items'     => 'Все типы проекта',
        ],
        'public'            => false,
        'publicly_queryable'=> false,
        'show_ui'           => true,
        'show_in_menu'      => true,
        'show_admin_column' => true,
        'show_in_rest'      => true,
        'hierarchical'      => true,
        'query_var'         => false,
        'rewrite'           => false,
    ]);
}
add_action('init', 'register_project_type_taxonomy');