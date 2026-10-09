<?php
/**
 * Alina Trefelova Portfolio
 * © 2026 Alina Trefelova / ATcode. All rights reserved.
 * Template Name: Single Project Page
 *
 * @package WordPress
 * @subpackage Portfolio_Theme
 * @since 1.0.0
 * @author Alina Trefelova / ATcode
 * @description Шаблон детальной страницы проекта.
 */

get_header();

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$base_settings_page_id = 134;
$settings_id = function_exists( 'pll_get_post' ) 
	? pll_get_post( $base_settings_page_id ) 
	: $base_settings_page_id;

if ( ! $settings_id ) {
	$settings_id = $base_settings_page_id;
}

$global_all_projects = get_field( 'global_all_projects', $settings_id ) ?: 'Все проекты';
$project_github_note = get_field( 'project_github_note', $settings_id ) ?: 'Read the source code here';
$project_stack_note = get_field( 'project_stack_note', $settings_id ) ?: 'Built with this';
?>

<?php if ( have_posts() ) : ?>
	<?php while ( have_posts() ) : the_post(); ?>
		<?php
		$post_id = get_the_ID();

		$short_description = get_field( 'short_description', $post_id );
		$project_date      = get_field( 'project_date', $post_id );
		$project_role      = get_field( 'project_role', $post_id );

		$project_types = get_the_terms( $post_id, 'project_type' );
		$type_name     = ( ! empty( $project_types ) && ! is_wp_error( $project_types ) ) ? $project_types[0]->name : '';

		$role_label = '';
		if ( ! empty( $project_role ) ) {
			$role_label = is_array( $project_role ) 
				? ( $project_role['label'] ?? reset( $project_role ) ) 
				: (string) $project_role;
}
		$project_links  = get_field( 'project_links', $post_id );
		$live_url       = $project_links['live_url'] ?? '';
		$github_url     = $project_links['github_url'] ?? '';
		$figma_url      = $project_links['figma_url'] ?? '';
		$case_study_url = $project_links['case_study_url'] ?? '';
		?>

		<section class="page-hero has-wavy-bottom project-hero">
			<div class="page-hero-container project-hero-container">

				<div class="project-hero-main">
					<div class="page-hero-content project-hero-info">
						<h1 class="page-hero-title project-hero-title">
							<?php the_title(); ?>
						</h1>

						<?php if ( $short_description ) : ?>
							<p class="page-hero-description project-hero-description">
								<?php echo esc_html( $short_description ); ?>
							</p>
						<?php endif; ?>
					</div>

					<?php if ( $case_study_url || $live_url || $figma_url || $github_url ) : ?>
						<div class="project-hero-links">
							<div class="project-links-list">
								<?php if ( $case_study_url ) : ?>
									<a href="<?php echo esc_url( $case_study_url ); ?>" target="_blank" rel="noopener noreferrer" class="project-link-item">
										<span class="link-text">[live_demo]</span>
										<span class="link-underline">
											<?php get_svg_icon( 'underline-link', 'link-underline-svg' ); ?>
										</span>
									</a>
								<?php endif; ?>

								<?php if ( $live_url ) : ?>
									<a href="<?php echo esc_url( $live_url ); ?>" target="_blank" rel="noopener noreferrer" class="project-link-item">
										<span class="link-text">[view_site]</span>
										<span class="link-underline">
											<?php get_svg_icon( 'underline-link', 'link-underline-svg' ); ?>
										</span>
									</a>
								<?php endif; ?>

								<?php if ( $figma_url ) : ?>
									<a href="<?php echo esc_url( $figma_url ); ?>" target="_blank" rel="noopener noreferrer" class="project-link-item">
										<span class="link-text">[figma_design]</span>
										<span class="link-underline">
											<?php get_svg_icon( 'underline-link', 'link-underline-svg' ); ?>
										</span>
									</a>
								<?php endif; ?>

								<?php if ( $github_url ) : ?>
									<div class="project-github-wrapper">
										<a href="<?php echo esc_url( $github_url ); ?>" target="_blank" rel="noopener noreferrer" class="project-link-item">
											<span class="link-text">[github_code]</span>
											<span class="link-underline">
												<?php get_svg_icon( 'underline-link', 'link-underline-svg' ); ?>
											</span>
										</a>
										<div class="github-note">
											<?php get_svg_icon( 'arrow-curly-small', 'github-arrow' ); ?>
											<span class="note"><?php echo esc_html( $project_github_note ); ?></span>
										</div>
									</div>
								<?php endif; ?>
							</div>
						</div>
					<?php endif; ?>
				</div>

				<div class="project-meta-badges">
					<?php if ( $role_label ) : ?>
						<span class="hero-tag tag-role">[role: <?php echo esc_html( $role_label ); ?>]</span>
					<?php endif; ?>

					<?php if ( $project_date ) : ?>
						<span class="hero-tag tag-year">[year: <?php echo esc_html( $project_date ); ?>]</span>
					<?php endif; ?>

					<?php if ( $type_name ) : ?>
						<span class="hero-tag tag-type">[type: <?php echo esc_html( $type_name ); ?>]</span>
					<?php endif; ?>
				</div>

			</div>
		</section>

		<?php
			$main_techs      = get_field( 'project_main_technologies', $post_id ) ?: [];
			$secondary_techs = get_field( 'project_secondary_technologies', $post_id ) ?: [];
			$all_terms       = array_merge( 
				is_array( $main_techs ) ? $main_techs : [ $main_techs ], 
				is_array( $secondary_techs ) ? $secondary_techs : [ $secondary_techs ] 
			);

			$grouped_stack = [];

			foreach ( $all_terms as $term_obj ) {
				if ( ! is_object( $term_obj ) ) continue;

				$cat = get_field( 'project_technology_category', 'term_' . $term_obj->term_id );
				$cat_key = $cat ? ( is_array( $cat ) ? $cat['value'] : $cat ) : 'other';

				if ( ! isset( $grouped_stack[ $cat_key ] ) ) {
					$grouped_stack[ $cat_key ] = [];
				}

				$grouped_stack[ $cat_key ][ $term_obj->term_id ] = [
					'name' => $term_obj->name,
					'link' => get_term_link( $term_obj ),
				];
			}

			$clean_json_data = [
				'stack' => []
			];

			foreach ( $grouped_stack as $cat_slug => $items ) {
				$clean_json_data['stack'][ $cat_slug ] = array_values( 
					array_map( fn( $i ) => $i['name'], $items ) 
				);
			}

			$json_string = wp_json_encode( $clean_json_data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
			?>

			<?php if ( ! empty( $grouped_stack ) ) : ?>
			<section class="project-stack-section">
				<div class="project-stack-container">

					<?php if ( $project_stack_note ) : ?>
						<div class="project-stack-note">
							<?php get_svg_icon( 'arrow-curly-medium', 'stack-arrow-svg' ); ?>
							<span class="note stack-note-text"><?php echo esc_html( $project_stack_note ); ?></span>
						</div>
					<?php endif; ?>

					<div class="stack-editor-ui">

						<div class="stack-editor-header">
							<div class="stack-editor-meta">
								<span class="geek-badge">[package.json]</span>
							</div>

							<button 
								type="button" 
								class="btn-copy-config" 
								data-json="<?php echo esc_attr( $json_string ); ?>"
								aria-label="Copy stack JSON configuration"
							>
								<span class="copy-text">[copy_config]</span>
							</button>
						</div>

						<div class="stack-editor-body">
							<div class="line-numbers stack-line-numbers" aria-hidden="true"></div>

							<div class="stack-content">
								<div class="json-code">
									<div class="code-line"><span class="token-bracket">{</span></div>
									<div class="code-line indent-1">
										<span class="token-key">"stack"</span><span class="token-colon">:</span> <span class="token-bracket">{</span>
									</div>

									<?php 
									$categories = array_keys( $grouped_stack );
									$total_cats = count( $categories );
									$c_idx = 0;

									foreach ( $grouped_stack as $category_slug => $tech_items ) :
										$c_idx++;
										$is_last_cat = ( $c_idx === $total_cats );
										$items = array_values( $tech_items );
										$total_items = count( $items );
									?>
										<div class="code-line indent-2">
											<span class="token-key">"<?php echo esc_html( $category_slug ); ?>"</span><span class="token-colon">:</span> <span class="token-bracket">[</span>
											<?php 
											$i_idx = 0;
											foreach ( $items as $item ) :
												$i_idx++;
												$is_last_item = ( $i_idx === $total_items );
												$link_url     = ! is_wp_error( $item['link'] ) ? $item['link'] : '#';
											?>
												<?php if ( $is_last_item ) : ?>
													<span class="json-array-end">
														<span class="token-quote">"</span><a href="<?php echo esc_url( $link_url ); ?>" class="tech-json-link"><?php echo esc_html( $item['name'] ); ?></a><span class="token-quote">"</span>
														<span class="token-bracket">]</span><?php if ( ! $is_last_cat ) echo '<span class="token-comma">,</span>'; ?>
													</span>
												<?php else : ?>
													<span class="token-quote">"</span><a href="<?php echo esc_url( $link_url ); ?>" class="tech-json-link"><?php echo esc_html( $item['name'] ); ?></a><span class="token-quote">"</span><span class="token-comma">, </span>
												<?php endif; ?>
											<?php endforeach; ?>
										</div>
									<?php endforeach; ?>

									<div class="code-line indent-1"><span class="token-bracket">}</span></div>
									<div class="code-line"><span class="token-bracket">}</span></div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</section>
		<?php endif; ?>

		<main class="project-content-body">
			<?php the_content(); ?>
		</main>

		<?php
		$post_id          = get_the_ID();
		$current_category = get_field( 'project_category', $post_id );
		$category_val     = is_array( $current_category ) ? ( $current_category['value'] ?? '' ) : $current_category;

		$slug_target = ( $category_val === 'playground' ) ? 'playground' : 'my-works';
		$back_page   = get_page_by_path( $slug_target );
		if ( $back_page && function_exists( 'pll_get_post' ) ) {
			$translated_page_id = pll_get_post( $back_page->ID );
			$back_url = $translated_page_id ? get_permalink( $translated_page_id ) : home_url( '/' . $slug_target );
		} else {
			$back_url = home_url( '/' . $slug_target );
		}

		$download_file = get_field( 'project_download_file', $post_id );
		$download_url  = '';
		$download_name = '';

		if ( ! empty( $download_file ) ) {
			if ( is_array( $download_file ) ) {
				$download_url  = $download_file['url'] ?? '';
				$download_name = $download_file['filename'] ?? basename( $download_url );
			} else {
				$download_url  = $download_file;
				$download_name = basename( $download_file );
			}
		}

		$all_cat_projects = get_posts( array(
			'post_type'      => 'projects',
			'posts_per_page' => -1,
			'post_status'    => 'publish',
			'meta_key'       => 'project_date',
			'orderby'        => 'meta_value',
			'order'          => 'DESC',
			'meta_query'     => array(
				array(
					'key'     => 'project_category',
					'value'   => $category_val,
					'compare' => '=',
				),
			),
		) );

		$next_project_post = null;
		$has_next_card     = false;

		if ( ! empty( $all_cat_projects ) ) {
			$ids   = wp_list_pluck( $all_cat_projects, 'ID' );
			$index = array_search( $post_id, $ids, true );

			if ( false !== $index && count( $ids ) > 1 ) {
				$next_index        = isset( $ids[ $index + 1 ] ) ? ( $index + 1 ) : 0;
				$next_project_post = $all_cat_projects[ $next_index ];
				
				if ( $next_project_post && $next_project_post->ID !== $post_id ) {
					$has_next_card   = true;
					$next_id         = $next_project_post->ID;
					$next_title      = get_the_title( $next_id );
					$next_link       = get_permalink( $next_id );
					$next_card_bg    = get_field( 'project_card_bg', $next_id ) ?: '#3a2d32';
					$next_img_url = get_the_post_thumbnail_url( $next_id, 'large' );

					$next_main_techs = get_field( 'project_main_technologies', $next_id );
					$next_tech_list  = '';

					if ( ! empty( $next_main_techs ) ) {
						if ( is_array( $next_main_techs ) ) {
							$tech_names = array_map( function( $term ) {
								return is_object( $term ) ? $term->name : (string) $term;
							}, $next_main_techs );
							$next_tech_list = implode( ' / ', $tech_names );
						} elseif ( is_object( $next_main_techs ) ) {
							$next_tech_list = $next_main_techs->name;
						}
					}
				}
			}
		}
		?>

		<section class="project-navigation-section">
			<div class="project-nav-container">

				<div class="project-nav-bar">
					<a href="<?php echo esc_url( $back_url ); ?>" class="btn-all-projects">
						<span class="btn-text">[ ← <?php echo esc_html( $global_all_projects ); ?> ]</span>
						<span class="btn-underline">
							<?php get_svg_icon( 'underline' ); ?>
						</span>
					</a>

					<?php if ( $download_url ) : ?>
						<a href="<?php echo esc_url( $download_url ); ?>" download class="btn-download-file" target="_blank" rel="noopener noreferrer">
							<span class="btn-text">[ file: <?php echo esc_html( $download_name ); ?> ]</span>
							
							<div class="btn-circle-hover">
								<?php get_svg_icon( 'round-outline-big' ); ?>
							</div>
						</a>
					<?php endif; ?>
				</div>

				<?php if ( $has_next_card ) : ?>
					<div class="next-project-card-wrapper">
						<a href="<?php echo esc_url( $next_link ); ?>" class="next-project-card" style="--accent-glow: <?php echo esc_attr( $next_card_bg ); ?>;">
							<div class="next-project-content">
								<span class="next-label">Next Project</span>
								<h3 class="next-title"><?php echo esc_html( $next_title ); ?></h3>
								<?php if ( $next_tech_list ) : ?>
									<span class="next-type"><?php echo esc_html( $next_tech_list ); ?></span>
								<?php endif; ?>
							</div>

							<div class="next-project-note">
								<span class="note">Check out my next baby!</span>
								<?php get_svg_icon( 'arrow-degree', 'next-arrow' ); ?>
							</div>

							<?php if ( $next_img_url ) : ?>
								<div class="next-project-preview">
									<img src="<?php echo esc_url( $next_img_url ); ?>" alt="<?php echo esc_attr( $next_title ); ?>">
								</div>
							<?php endif; ?>
						</a>
					</div>
				<?php endif; ?>

			</div>
		</section>

	<?php endwhile; ?>
<?php endif; ?>

<?php get_footer(); ?>