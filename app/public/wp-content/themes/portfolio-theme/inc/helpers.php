<?php
    function add_link_class_to_menu($atts, $item, $args) {
        if ($args->theme_location === 'header_menu') {
            $atts['class'] = ($atts['class'] ?? '') . ' link-underline';
        }
        return $atts;
    }

    add_filter('nav_menu_link_attributes', 'add_link_class_to_menu', 10, 3);



/**
 * Выводит или возвращает содержимое SVG-файла из темы с возможностью кастомных CSS-классов.
 *
 * @param string $filename Имя файла без расширения (напр., 'playground-arrow').
 * @param string $class    Дополнительные CSS-классы через пробел (напр., 'hero-arrow is-active').
 * @param bool   $echo     Выводить сразу (true) или вернуть строку (false).
 * @return string
 */
function get_svg_icon( $filename, $class = '', $echo = true ) {
    $filepath = get_template_directory() . '/assets/images/' . $filename . '.svg';

    if ( ! file_exists( $filepath ) ) {
        return '';
    }

    $svg_content = file_get_contents( $filepath );

    if ( ! empty( $class ) ) {
        $class = esc_attr( trim( $class ) );

        if ( preg_match( '/<svg[^>]*\bclass=["\']([^"\']*)["\']/i', $svg_content, $matches ) ) {
            $existing_classes = $matches[1];
            $updated_classes  = trim( $existing_classes . ' ' . $class );

            $svg_content = preg_replace(
                '/(<svg[^>]*\bclass=["\'])' . preg_quote( $matches[1], '/' ) . '(["\'])/i',
                '${1}' . $updated_classes . '${2}',
                $svg_content,
                1
            );
        } else {
            $svg_content = preg_replace( '/<svg/i', '<svg class="' . $class . '"', $svg_content, 1 );
        }
    }

    if ( $echo ) {
        echo $svg_content;
    } else {
        return $svg_content;
    }
}