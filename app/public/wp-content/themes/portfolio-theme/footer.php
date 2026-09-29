<?php
/**
 * Project: Alina Trefelova Portfolio
 * Copyright: © 2026 Alina Trefelova / ATcode. All rights reserved.
 * Author: Alina Trefelova / ATcode
 * Description: Шаблон подвала сайта (Footer) с мультиязычными настройками из страниц,
 *              а также бегущей строкой с таксономиями используемых технологий.
 *
 * @package portfolio-theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Выход при прямом доступе.
}

/**
 * ID базовой страницы настроек для получения глобальных полей ACF.
 *
 * @var int $base_settings_page_id ID страницы настроек по умолчанию.
 */
$base_settings_page_id = 134;

/**
 * Определение ID страницы настроек с учетом текущего языка в Polylang.
 *
 * @var int $settings_id Локализованный ID страницы настроек.
 */
$settings_id = function_exists( 'pll_get_post' ) 
	? pll_get_post( $base_settings_page_id ) 
	: $base_settings_page_id;

if ( ! $settings_id ) {
	$settings_id = $base_settings_page_id;
}

$footer_name   = get_field( 'footer_name', $settings_id ) ?: 'Алина Трефелова';
$contact_text  = get_field( 'global_contact_btn', $settings_id ) ?: 'связаться_со_мной();';
$tg_link       = get_field( 'global_telegram', $settings_id );
$email_link    = get_field( 'global_email', $settings_id );
$github_link   = get_field( 'global_github', $settings_id );
$linkedin_link = get_field( 'global_linkedin', $settings_id );

$contacts_page_id = function_exists( 'pll_get_post' ) ? pll_get_post( 51 ) : 51;
$contacts_url     = $contacts_page_id ? get_permalink( $contacts_page_id ) : home_url( '/contacts' );

if ( $tg_link && ! preg_match( '/^http/', $tg_link ) ) {
	$tg_link_full = 'https://t.me/' . ltrim( $tg_link, '@' );
}

/**
 * Получение всех терминов из таксономии технологий для бегущей строки.
 *
 * @var array|WP_Error $technologies Список терминов технологий.
 */
$technologies = get_terms(
	array(
		'taxonomy'   => 'project_technology',
		'hide_empty' => false,
	)
);

$marquee_items_html = '';

if ( ! is_wp_error( $technologies ) && ! empty( $technologies ) ) {
	shuffle( $technologies );
	
	foreach ( $technologies as $tech ) {
		$marquee_items_html .= '<span class="marquee-item">' . esc_html( $tech->name ) . '</span>';
		$marquee_items_html .= '<span class="marquee-dot">·</span>';
	}
} else {
	$fallback = array( 'TypeScript', 'HTML', 'JavaScript', 'Tailwind', 'Python', 'React' );
	shuffle( $fallback );
	foreach ( $fallback as $tech ) {
		$marquee_items_html .= '<span class="marquee-item">' . esc_html( $tech ) . '</span>';
		$marquee_items_html .= '<span class="marquee-dot">·</span>';
	}
}
?>

<footer class="site-footer">
	<?php if ( ! empty( $marquee_items_html ) ) : ?>
		<div class="footer-marquee">
			<div class="marquee-track">
				<div class="marquee-content"><?php echo $marquee_items_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div>
				<div class="marquee-content" aria-hidden="true"><?php echo $marquee_items_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div>
				<div class="marquee-content" aria-hidden="true"><?php echo $marquee_items_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div>
				<div class="marquee-content" aria-hidden="true"><?php echo $marquee_items_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div>
			</div>
		</div>
	<?php endif; ?>
	
	<div class="footer-container">
		
		<div class="footer-main-info">
			<div class="site-logo">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="site-logo-text">
					AT<span class="logo-code">[code]</span>
				</a>
			</div>
			
			<div class="footer-contact-wrapper">
				<?php if ( $email_link ) : ?>
					<a href="<?php echo esc_url( $contacts_url ); ?>" class="footer-contact-link">
						<?php echo esc_html( $contact_text ); ?>
					</a>
				<?php else : ?>
					<span class="footer-contact-link"><?php echo esc_html( $contact_text ); ?></span>
				<?php endif; ?>
				
				<span class="footer-heart">
					<?php get_svg_icon('heart'); ?>
				</span>
			</div>
		</div>

		<div class="footer-socials">
			<?php if ( $tg_link ) : ?>
				<a href="<?php echo esc_url( $tg_link_full ); ?>" target="_blank" rel="noopener noreferrer" class="social-link" data-text="[telegram]">
					<span class="link-text">[telegram]</span>
					<span class="link-icon">
						<?php get_svg_icon('tg'); ?>
					</span>
				</a>
			<?php endif; ?>

			<?php if ( $email_link ) : ?>
				<a href="mailto:<?php echo esc_attr( antispambot( $email_link ) ); ?>" class="social-link" data-text="[email]">
					<span class="link-text">[email]</span>
					<span class="link-icon">
						<?php get_svg_icon('email'); ?>
					</span>
				</a>
			<?php endif; ?>

			<?php if ( $github_link ) : ?>
				<a href="<?php echo esc_url( $github_link ); ?>" target="_blank" rel="noopener noreferrer" class="social-link" data-text="[github]">
					<span class="link-text">[github]</span>
					<span class="link-icon">
						<?php get_svg_icon('github'); ?>
					</span>
				</a>
			<?php endif; ?>

			<?php if ( $linkedin_link ) : ?>
				<a href="<?php echo esc_url( $linkedin_link ); ?>" target="_blank" rel="noopener noreferrer" class="social-link" data-text="[linkedin]">
					<span class="link-text">[linkedin]</span>
					<span class="link-icon">
						<?php get_svg_icon('linkedin'); ?>
					</span>
				</a>
			<?php endif; ?>
		</div>

		<div class="footer-copyright">
			<span class="copyright-year">© 2026 <?php echo esc_html( $footer_name ); ?></span>
			<span class="copyright-crafted">Hand-coded with love & zero_sugar_cola</span>
		</div>

	</div>
</footer>

<button id="scroll-to-top" class="scroll-to-top" type="button" aria-label="Наверх">
	<?php get_svg_icon('arrow-straight'); ?>
</button>

<?php wp_footer(); ?>
</body>
</html>
