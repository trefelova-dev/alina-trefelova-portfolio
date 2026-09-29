<?php
add_theme_support('post-thumbnails');

function theme_register_menus() {
    register_nav_menus([
        'header_menu' => 'Header Menu',
    ]);
}

add_action('after_setup_theme', 'theme_register_menus'); 

add_action('wp_ajax_send_contact_form', 'handle_contact_form');
add_action('wp_ajax_nopriv_send_contact_form', 'handle_contact_form');

add_action('wp_ajax_send_contact_form', 'handle_contact_form');
add_action('wp_ajax_nopriv_send_contact_form', 'handle_contact_form');

function handle_contact_form() {
    $name = sanitize_text_field($_POST['name']);
    $email = sanitize_email($_POST['email']);
    $message = sanitize_textarea_field($_POST['message']);

    if (!$name || !$email || !$message) {
        echo 'Заполните все поля';
        wp_die();
    }

    if (!empty($_POST['hp_name'])) {
        wp_die('Спам заблокирован');
    }

    $to = get_field('global_email', get_page_by_path('site-settings')->ID);

    $subject = 'Новое сообщение с сайта';

    $body = "
    <html>
    <body>
    <h2>Новое сообщение с сайта</h2>
    <p><strong>Имя:</strong> $name</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Сообщение:</strong><br/> $message</p>
    </body>
    </html>";

    $headers = ['Content-Type: text/html; charset=UTF-8'];


    if (wp_mail($to, $subject, $body, $headers)) {
        echo 'Сообщение отправлено!';
    } else {
        echo 'Ошибка отправки';
    }

    wp_die();
}

require get_template_directory() . '/inc/enqueue.php';
require get_template_directory() . '/inc/cpt.php';
require get_template_directory() . '/inc/helpers.php';

add_filter('nav_menu_link_attributes', 'add_svg_to_menu_links', 10, 4);
function add_svg_to_menu_links($atts, $item, $args, $depth) {
    if ($args->theme_location === 'header_menu') {
        $atts['class'] = isset($atts['class']) ? $atts['class'] . ' menu-link-with-svg' : 'menu-link-with-svg';
    }
    return $atts;
}

add_filter('wp_nav_menu_items', 'inject_svg_into_menu', 10, 2);
function inject_svg_into_menu($items, $args) {
    if ($args->theme_location === 'header_menu') {
        $svg_code = '<svg class="menu-underline-svg" width="121" height="11" viewBox="0 0 121 11" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path class="line-1" d="M1.00012 5.09717C13.8335 3.09717 53.1001 -0.40283 107.5 1.59717" stroke="#A9232B" stroke-width="2" stroke-linecap="round"/>
            <path class="line-2" d="M22.5001 9.09711C41.6668 6.26378 87.9001 1.79711 119.5 6.59711" stroke="#A9232B" stroke-width="2" stroke-linecap="round"/>
        </svg>';
        
        $items = str_replace('</a>', $svg_code . '</a>', $items);
    }
    return $items;
}

?>