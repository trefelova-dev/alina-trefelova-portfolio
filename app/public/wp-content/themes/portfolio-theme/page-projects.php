<?php
/**
 * Alina Trefelova Portfolio
 * © 2026 Alina Trefelova / ATcode. All rights reserved.
 * Author: Alina Trefelova / ATcode
 *
 * Шаблон страницы проектов (Projects) / Playground.
 *
 * @package WordPress
 * @subpackage Portfolio_Theme
 * @since 1.0.0
 * @template Name: Projects / Playground Template
 */

get_header();

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

$is_tech_archive = is_tax('project_technology');
$current_term    = $is_tech_archive ? get_queried_object() : null;

if ($is_tech_archive && $current_term) {
	$projects_title       = $current_term->name;
	$projects_description = !empty($current_term->description) ? trim(strip_tags($current_term->description)) : '';
	$current_category     = 'taxonomy';

	$tech_icon            = get_field('project_technology_icon', 'term_' . $current_term->term_id);

	$arrow_note             = '';
	$empty_page_title       = function_exists('pll__') ? pll__('Проектов пока нет') : 'Проектов пока нет';
	$empty_page_description = '';
} else {
	$projects_title         = get_field('projects_title');
	$projects_description   = get_field('projects_description');
	$placeholder_for_search = get_field('placeholder_for_search');
	$or_for_search          = get_field('or_for_search');
	$filter_all             = get_field('filter_all');
	$arrow_note             = get_field('arrow_note');
	$empty_page_title       = get_field('empty_page_title');
	$empty_page_description = get_field('empty_page_description');
	$empty_page_picture     = get_field('empty_page_picture');
	$empty_page_contacts    = get_field('empty_page_contacts');
	$current_category       = get_field('target_project_category');
	$tech_icon              = null;
}
?>

<section class="page-hero has-wavy-bottom">
	<div class="page-hero-container">

		<div class="page-hero-content">
			<?php if ($projects_title) : ?>
				<div class="playground-hero-title">
					<h1 class="page-hero-title">
						<?php echo esc_html($projects_title); ?>
					</h1>

					<?php if ($current_category === 'playground') : ?>
						<div class="playground-note">
							<span class="note">No rules, just code</span>
							<?php get_svg_icon('arrow-curly-small', 'playground-arrow'); ?>
						</div>
					<?php endif; ?>
				</div>
			<?php endif; ?>

			<?php if ($projects_description) : ?>
				<p class="page-hero-description">
					<?php echo esc_html($projects_description); ?>
				</p>
			<?php endif; ?>
		</div>

		<div class="page-hero-controls">

			<?php if ($is_tech_archive) : ?>
				<?php if (!empty($tech_icon)) : ?>
					<div class="hero-tech-icon">
						<?php echo $tech_icon; ?>
					</div>
				<?php endif; ?>

			<?php else : ?>
				<form role="search" method="get" class="hero-search-form" action="<?php echo esc_url(home_url('/')); ?>">
					<div class="hero-search-wrapper">
						<input 
							type="search" 
							class="hero-search-input" 
							placeholder="<?php echo esc_attr($placeholder_for_search); ?>" 
							value="" 
							name="s" 
						/>
						<button type="submit" class="hero-search-submit" aria-label="Поиск">
							<?php get_svg_icon('magnifier'); ?>
						</button>
					</div>
				</form>

				<?php if ($or_for_search) : ?>
					<span class="note search-note"><?php echo esc_html($or_for_search); ?></span>
				<?php endif; ?>

				<div class="hero-filters">
					<button class="filter-btn active" data-filter="all">
						[ <?php echo esc_html($filter_all ?: 'все'); ?> ]
					</button>

					<?php if ($current_category === 'work') : ?>
						<button class="filter-btn" data-filter="react">[ react ]</button>
						<button class="filter-btn" data-filter="wordpress">[ wordpress ]</button>
						<button class="filter-btn" data-filter="python">[ python ]</button>

					<?php elseif ($current_category === 'playground') : ?>
						<button class="filter-btn" data-filter="game">[ games ]</button>
						<button class="filter-btn" data-filter="creative">[ creative ]</button>
					<?php endif; ?>
				</div>
			<?php endif; ?>

		</div>

	</div>
</section>

<section class="projects-grid">

	<?php
	if ($is_tech_archive && $current_term) {
		$args = array(
			'post_type'      => 'projects',
			'posts_per_page' => -1,
			'post_status'    => 'publish',
			'meta_key'       => 'project_date',
			'orderby'        => 'meta_value',
			'order'          => 'DESC',
			'tax_query'      => array(
				array(
					'taxonomy' => 'project_technology',
					'field'    => 'term_id',
					'terms'    => $current_term->term_id,
				)
			)
		);
	} else {
		$args = array(
			'post_type'      => 'projects',
			'posts_per_page' => -1,
			'post_status'    => 'publish',
			'meta_key'       => 'project_date',
			'orderby'        => 'meta_value',
			'order'          => 'DESC',
			'meta_query'     => array(
				array(
					'key'     => 'project_category',
					'value'   => $current_category,
					'compare' => '='
				)
			)
		);
	}

	$projects_query = new WP_Query($args);

	if ($current_category === 'work' && $arrow_note && $projects_query->post_count >= 2) : ?>
		<div class="projects-grid-note">
			<?php get_svg_icon('arrow-curly-medium', 'projects-grid-arrow'); ?>
			<span class="note arrow-note"><?php echo esc_html($arrow_note); ?></span>
		</div>
	<?php endif; ?>

	<?php
	if ($projects_query->have_posts()) :
		$project_index = 0;

		while ($projects_query->have_posts()) :
			$projects_query->the_post();

			$project_index++;
			$formatted_number = sprintf('%02d', $project_index);

			$tech_array = array();
			$tech_names = array();

			$main_techs = get_field('project_main_technologies');
			if (!empty($main_techs) && is_array($main_techs)) {
				foreach ($main_techs as $tech) {
					$tech_array[] = strtolower($tech->slug);
					$tech_names[] = $tech->name;
				}
			}

			$sec_techs = get_field('project_secondary_technologies');
			if (!empty($sec_techs) && is_array($sec_techs)) {
				foreach ($sec_techs as $tech) {
					$tech_array[] = strtolower($tech->slug);
				}
			}

			$type_attr = '';
			if ($current_category === 'playground') {
				$project_type = get_field('project_type');
				if (!empty($project_type) && is_object($project_type)) {
					$type_attr = strtolower($project_type->slug);
				}
			}

			$data_tech_attr = implode(' ', array_unique($tech_array));

			$gallery_images = array();
			if (has_post_thumbnail()) {
				$gallery_images[] = get_the_post_thumbnail_url(get_the_ID(), 'large');
			}
			for ($i = 1; $i <= 3; $i++) {
				$img = get_field('project_preview_image_' . $i);
				if (!empty($img)) {
					$gallery_images[] = is_array($img) ? $img['url'] : $img;
				}
			}

			get_template_part('template-parts/project-card', null, array(
				'formatted_number'  => $formatted_number,
				'data_tech_attr'    => $data_tech_attr,
				'type_attr'         => $type_attr,
				'card_bg'           => get_field('project_card_bg'),
				'short_description' => get_field('short_description'),
				'gallery_images'    => $gallery_images,
				'project_add'       => get_field('project_add'),
				'tech_names'        => $tech_names,
			));

		endwhile;
		wp_reset_postdata();
		?>

	<?php endif; ?>
</section>

<section class="empty-page-section">
	<div class="empty-page-container">
		
		<div class="empty-page-content">
			<div class="empty-page-text">
				<?php if ($empty_page_title) : ?>
					<h2 class="empty-page-title"><?php echo esc_html($empty_page_title); ?></h2>
				<?php endif; ?>

				<?php if ($empty_page_description) : ?>
					<div class="empty-page-description">
						<?php echo wp_kses_post($empty_page_description); ?>
					</div>
				<?php endif; ?>
			</div>

			<div class="empty-page-graphic">
				<?php if ($current_category === 'work') : ?>
					<?php get_svg_icon('empty-folder', 'empty-folder-icon'); ?>
				<?php else : ?>
					<span class="empty-shrug">¯\_(ツ)_/¯</span>
				<?php endif; ?>
			</div>
		</div>

		<?php
		get_template_part(
			'template-parts/contacts-callout',
			null,
			array(
				'title'      => get_field('empty_page_contacts'),
				'layout'     => $current_category,
				'arrow_type' => 'straight'
			)
		);
		?>

	</div>
</section>

<?php
get_footer();
?>
