<?php
/**
 * Alina Trefelova Portfolio
 * © 2026 Alina Trefelova / ATcode. All rights reserved.
 * Template Name: Contacts Page
 *
 * @package WordPress
 * @subpackage Portfolio_Theme
 * @since 1.0.0
 * @author Alina Trefelova / ATcode
 * @description Шаблон страницы контактов с формой обратной связи и социальными сетями.
 */

get_header();

if ( ! defined( 'ABSPATH' ) ) {
	exit;
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

$tg_link       = get_field( 'global_telegram', $settings_id );
$email_link    = get_field( 'global_email', $settings_id );
$github_link   = get_field( 'global_github', $settings_id );
$linkedin_link = get_field( 'global_linkedin', $settings_id );

$tg_link_full = '';
if ( $tg_link ) {
	$tg_link_full = ! preg_match( '/^http/', $tg_link ) 
		? 'https://t.me/' . ltrim( $tg_link, '@' ) 
		: $tg_link;
}

$contacts_title       = get_field( 'contacts_title' );
$contacts_description = get_field( 'contacts_description' );
$contact_name_label   = get_field( 'contact_name_label' );
$contact_email_label  = get_field( 'contact_email_label' );
$contact_message_label = get_field( 'contact_message_label' );
$contact_loader_text  = get_field( 'contact_loader_text' );
$contact_success_text = get_field( 'contact_success_text' ) ?: 'Сообщение отправлено!';
$contact_error_text   = get_field( 'contact_error_text' ) ?: 'Ошибка отправки. Попробуйте позже.';
$arrow_title          = get_field( 'arrow_title' );
$arrow_tg             = get_field( 'arrow_tg' );
$ad_for_alyona   = get_field( 'ad_for_alyona' );
$link_for_alyona = get_field( 'link_for_alyona' );
?>

<section class="page-hero has-wavy-bottom">
	<div class="page-hero-container contacts-hero-container">

		<div class="page-hero-content">
			<?php if ($contacts_title) : ?>
				<div class="contacts-hero-title">
					<h1 class="page-hero-title">
						<?php echo esc_html($contacts_title); ?>
					</h1>
				</div>
			<?php endif; ?>

			<?php if ($contacts_description) : ?>
				<p class="page-hero-description">
					<?php echo esc_html($contacts_description); ?>
				</p>
			<?php endif; ?>
		</div>

        <div class="contacts-note">
            <?php get_svg_icon('arrow-curly-big', 'contacts-arrow'); ?>
            <?php if ($arrow_title) : ?>
                <span class="note">
                    <?php echo esc_html($arrow_title); ?>
                </span>
            <?php endif; ?>
        </div>
	</div>
</section>

<div class="page-contacts-container">
	<section class="contacts-list-section">
		<div class="contacts-items-wrapper">
			<div class="contacts-list-item">
				<?php get_svg_icon( 'tg', 'contacts-icon' ); ?>
				<div class="contacts-content">
					<span class="contacts-title">Telegram</span>
					<a href="<?php echo esc_url( $tg_link_full ); ?>" target="_blank" rel="noopener noreferrer" class="contacts-link">
						<?php echo esc_html( $tg_link ); ?>
					</a>
				</div>
				<div class="contacts-tg-note">
					<?php get_svg_icon( 'round-outline-big', 'tg-outline' ); ?>
					<?php get_svg_icon( 'arrow-wp', 'tg-arrow' ); ?>
					<span class="note"><?php echo esc_html( $arrow_tg ); ?></span>
				</div>
			</div>

			<div class="contacts-list-item">
				<?php get_svg_icon( 'email', 'contacts-icon' ); ?>
				<div class="contacts-content">
					<span class="contacts-title">Email</span>
					<a href="mailto:<?php echo esc_attr( $email_link ); ?>" target="_blank" rel="noopener noreferrer" class="contacts-link">
						<?php echo esc_html( $email_link ); ?>
					</a>
				</div>
			</div>

			<div class="contacts-list-item">
				<?php get_svg_icon( 'github', 'contacts-icon' ); ?>
				<div class="contacts-content">
					<span class="contacts-title">GitHub</span>
					<a href="<?php echo esc_url( $github_link ); ?>" target="_blank" rel="noopener noreferrer" class="contacts-link">
						<?php echo esc_html( $github_link ); ?>
					</a>
				</div>
			</div>

			<div class="contacts-list-item">
				<?php get_svg_icon( 'linkedin', 'contacts-icon' ); ?>
				<div class="contacts-content">
					<span class="contacts-title">LinkedIn</span>
					<a href="<?php echo esc_url( $linkedin_link ); ?>" target="_blank" rel="noopener noreferrer" class="contacts-link">
						<?php echo esc_html( $linkedin_link ); ?>
					</a>
				</div>
			</div>
		</div>

		<?php if ( $ad_for_alyona ) : 
			$link_url  = ! empty( $link_for_alyona ) ? esc_url( $link_for_alyona ) : '#';
			$link_html = '<a href="' . $link_url . '" target="_blank" rel="noopener noreferrer" class="promo-link">&nbsp;[&nbsp;link&nbsp;]</a>';

			$clean_text = strip_tags( $ad_for_alyona );
			$lines = array_values( array_filter( array_map( 'trim', explode( "\n", str_replace( "\r", "", $clean_text ) ) ) ) );

			$line_1 = $lines[0] ?? '';
			$line_2 = $lines[1] ?? '';

			if ( preg_match( '/\[\s*link\s*\]/i', $line_2 ) ) {
				$line_2 = preg_replace( '/\[\s*link\s*\]/i', $link_html, esc_html( $line_2 ) );
			} else {
				$line_2 = esc_html( $line_2 ) . ' ' . $link_html;
			}
		?>
			<div class="contacts-banner-card">
				<div class="promo-line-numbers" aria-hidden="true">
					<span>01</span>
					<span>02</span>
				</div>
				<div class="promo-content">
					<div class="promo-line"><?php echo esc_html( $line_1 ); ?></div>
					<div class="promo-line"><?php echo $line_2; ?></div>
				</div>
			</div>
		<?php endif; ?>
	</section>

	<section class="contacts-form">
		<div class="form-editor-ui">
			<div class="line-numbers" id="line-numbers" aria-hidden="true"></div>

			<div class="form-content">
				<form 
					id="contact-form" 
					action="#" 
					method="POST"
					data-success="<?php echo esc_attr( $contact_success_text ); ?>"
					data-error="<?php echo esc_attr( $contact_error_text ); ?>"
				>
					<div style="display: none;">
						<input type="text" name="hp_name" value="" tabindex="-1" autocomplete="off">
					</div>

					<div class="form-group">
						<label for="name">name:</label>
						<input type="text" id="name" name="name" placeholder="<?php echo esc_attr( $contact_name_label ); ?>" required>
					</div>

					<div class="form-group">
						<label for="email">email:</label>
						<input type="email" id="email" name="email" placeholder="<?php echo esc_attr( $contact_email_label ); ?>" required>
					</div>

					<div class="form-group">
						<label for="message">message:</label>
						<textarea id="message" name="message" placeholder="<?php echo esc_attr( $contact_message_label ); ?>" required></textarea>
					</div>

					<div class="form-submit">
						<button type="submit" class="contact-submit">
							<span class="btn-text">send_message();</span>
							<span class="btn-loader-text"><?php echo esc_html( $contact_loader_text ); ?></span>
						</button>
					</div>
					
					<div id="form-response"></div>
				</form>
			</div>
		</div>
	</section>
</div>

<?php get_footer(); ?>