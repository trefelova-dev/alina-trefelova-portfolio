<?php
/**
 * Шаблон страницы 404 ошибки.
 *
 * @package WordPress
 * @subpackage Portfolio_Theme
 */

get_header();

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$current_lang = function_exists('pll_current_language') ? pll_current_language() : 'ru';

$query_404 = new WP_Query(array(
	'post_type'              => 'page',
	'title'                  => ($current_lang === 'en') ? '404 Error' : '404 Ошибка',
	'posts_per_page'         => 1,
	'post_status'            => 'publish',
	'no_found_rows'          => true,
	'update_post_term_cache' => false,
));

$page_id = !empty($query_404->posts) ? $query_404->posts[0]->ID : null;

$error_title       = get_field('error_404_title', $page_id);
$error_description = get_field('error_404_description', $page_id);
$error_btn_text    = get_field('error_404_btn_text', $page_id);

$default_btn_text  = ($current_lang === 'en') ? 'Back to Home' : 'На главную';
?>


<section class="page-hero has-wavy-bottom">
	<div class="page-hero-container">

		<div class="page-hero-content">
			<div class="playground-hero-title">
				<h1 class="page-hero-title">404</h1>
			</div>
		</div>

	</div>
</section>

<section class="empty-page-section">
	<div class="empty-page-container">
		
		<div class="empty-page-content">
			<div class="empty-page-text">
				<?php if ( ! empty($error_title) ) : ?>
					<h2 class="empty-page-title"><?php echo esc_html($error_title); ?></h2>
				<?php endif; ?>

				<?php if ( ! empty($error_description) ) : ?>
					<div class="empty-page-description">
						<?php echo wp_kses_post(wpautop($error_description)); ?>
					</div>
				<?php endif; ?>
			</div>

			<div class="empty-page-graphic">
				<span class="empty-shrug">¯\_(ツ)_/¯</span>
			</div>
		</div>

        <div class="hero-actions">
			<a href="<?php echo esc_url(home_url('/')); ?>" class="action-button">
				<span class="action-button-text">[ <?php echo esc_html($error_btn_text ?: $default_btn_text); ?> ]</span>
			</a>
		</div>

	</div>
</section>

<?php
get_footer();