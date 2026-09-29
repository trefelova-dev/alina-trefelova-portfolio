<?php
/**
 * Project: Alina Trefelova Portfolio
 * Copyright: © 2026 Alina Trefelova / ATcode. All rights reserved.
 * Author: Alina Trefelova / ATcode
 * Description: Шаблон шапки сайта (Header). Выводит head-секцию, логотип, главное меню и переключатель языков.
 *
 * @package portfolio-theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$current_lang = function_exists( 'pll_current_language' ) ? pll_current_language() : 'ru';
$translations = function_exists( 'pll_the_languages' ) ? pll_the_languages( array( 'raw' => 1 ) ) : array();
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php
if ( function_exists( 'wp_body_open' ) ) {
	wp_body_open();
}
?>

<header class="site-header">
	<div class="header-container">

		<div class="header-left">
			<div class="lang-switcher lang-desktop <?php echo ( 'en' === $current_lang ) ? 'lang-en' : ''; ?>">
				<?php 
				if ( ! empty( $translations ) ) :
					foreach ( array( 'ru', 'en' ) as $lang_slug ) :
						if ( isset( $translations[ $lang_slug ] ) ) :
							$lang      = $translations[ $lang_slug ];
							$is_active = $lang['current_lang'] ? 'active' : '';
							?>
							<a href="<?php echo esc_url( $lang['url'] ); ?>" class="lang-btn <?php echo esc_attr( $is_active ); ?>">
								<?php echo esc_html( ucfirst( $lang_slug ) ); ?>
							</a>
							<?php
						endif;
					endforeach;
				endif;
				?>
			</div>

			<div class="site-logo">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="site-logo-text">
					AT<span class="logo-code">[code]</span>
				</a>
			</div>
		</div>

		<div class="header-right">
			<nav class="site-navigation">
				<?php 
				wp_nav_menu(
					array(
						'theme_location' => 'header_menu',
						'container'      => false,
						'menu_class'     => 'header-menu-list',
						'fallback_cb'    => '__return_false',
						'depth'          => 1,
					)
				);
				?>

				<div class="lang-switcher lang-mobile <?php echo ( 'en' === $current_lang ) ? 'lang-en' : ''; ?>">
					<?php 
					if ( ! empty( $translations ) ) :
						foreach ( array( 'ru', 'en' ) as $lang_slug ) :
							if ( isset( $translations[ $lang_slug ] ) ) :
								$lang      = $translations[ $lang_slug ];
								$is_active = $lang['current_lang'] ? 'active' : '';
								?>
								<a href="<?php echo esc_url( $lang['url'] ); ?>" class="lang-btn <?php echo esc_attr( $is_active ); ?>">
									<?php echo esc_html( ucfirst( $lang_slug ) ); ?>
								</a>
								<?php
							endif;
						endforeach;
					endif;
					?>
				</div>
			</nav>

			<button class="burger-menu-btn" aria-label="<?php esc_attr_e( 'Open menu', 'portfolio-theme' ); ?>">
				<span class="burger-line"></span>
				<span class="burger-line"></span>
				<span class="burger-line"></span>
			</button>
		</div>

	</div>
</header>
