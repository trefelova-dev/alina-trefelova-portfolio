<?php
/**
 * Project: Alina Trefelova Portfolio
 * Copyright: © 2026 Alina Trefelova / ATcode. All rights reserved.
 * Author: Alina Trefelova / ATcode
 * Description: Шаблонный элемент секции призыва к действию (Contacts Callout Section).
 * Отображает заголовок, декоративные стрелки (в зависимости от макета)
 * и анимированную кнопку для перехода на страницу контактов.
 *
 * @package portfolio-theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$title         = ! empty( $args['title'] ) ? $args['title'] : 'Создадим что-нибудь крутое вместе?';
$layout        = ! empty( $args['layout'] ) ? $args['layout'] : 'home';
$arrow_type    = ! empty( $args['arrow_type'] ) ? $args['arrow_type'] : 'curved';
$section_class = 'contacts-callout contacts-callout-' . esc_attr( $layout );

$contacts_page_id = function_exists( 'pll_get_post' ) ? pll_get_post( 51 ) : 51;
$contacts_url     = $contacts_page_id ? get_permalink( $contacts_page_id ) : home_url( '/contacts/' );
?>

<section class="<?php echo esc_attr( $section_class ); ?>">
	<div class="contacts-container">
		
		<h2 class="contacts-title">
			<?php echo wp_kses_post( $title ); ?>
		</h2>

		<div class="contacts-arrow contacts-arrow-<?php echo esc_attr( $arrow_type ); ?>">
			<?php if ( 'straight' === $arrow_type ) : ?>
				<?php get_svg_icon('arrow-straight', 'arrow-desktop arrow-straight'); ?>
			<?php else : ?>
				<?php get_svg_icon('arrow-degree', 'arrow-desktop arrow-curved'); ?>
			<?php endif; ?>

			<div class="contacts-arrow-mobile">
				<?php get_svg_icon('arrow-curly-medium', 'arrow-mobile'); ?>
			</div>
		</div>

		<div class="contacts-action">
			<a href="<?php echo esc_url( $contacts_url ); ?>" class="btn-contacts">
				<span class="btn-contacts-text">contacts();</span>
			</a>
		</div>

	</div>
</section>