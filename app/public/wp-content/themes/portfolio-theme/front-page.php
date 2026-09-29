<?php
/**
 * Alina Trefelova Portfolio
 * © 2026 Alina Trefelova / ATcode. All rights reserved.
 * Author: Alina Trefelova / ATcode
 *
 * Главная страница портфолио (Front Page).
 * Отображает главный экран с фото и заголовком, интерактивный стек технологий,
 * краткую секцию "О себе", избранные проекты и блок контактов.
 *
 * @package WordPress
 * @subpackage Portfolio_Theme
 * @since 1.0.0
 */

get_header();

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$home_title             = get_field( 'home_title' );
$home_main_photo        = get_field( 'home_main_photo' );
$home_welcome_text      = get_field( 'home_welcome_text' );
$arrow_about_me         = get_field( 'arrow_about_me' );
$arrow_about_degree     = get_field( 'arrow_about_degree' );
$arrow_about_technology = get_field( 'arrow_about_technology' );
$home_about             = get_field( 'home_about' );
$featured_projects      = get_field( 'home_projects' );

$about_page_id = function_exists( 'pll_get_post' ) ? pll_get_post( 45 ) : 45;
$about_url     = $about_page_id ? get_permalink( $about_page_id ) : home_url( '/about' );

$projects_page_id = function_exists( 'pll_get_post' ) ? pll_get_post( 47 ) : 47;
$projects_url     = $projects_page_id ? get_permalink( $projects_page_id ) : home_url( '/my-works' );
?>

<section class="hero-section has-wavy-bottom">
	<div class="hero-container">
		
		<div class="hero-photo-wrapper">
			<?php if ( $home_main_photo ) : ?>
				<img src="<?php echo esc_url( $home_main_photo ); ?>" alt="Алина Трефелова" class="hero-main-img">
			<?php endif; ?>

			<span class="hero-tag tag-loc">[loc: world_wide]</span>
			<span class="hero-tag tag-mood">[mood: focus_on_details]</span>
			<span class="hero-tag tag-status">[status: open_to_collab]</span>

			<div class="hero-arrow-me">
				<?php get_svg_icon('arrow-curly-small'); ?>
				<span class="arrow-text note"><?php echo esc_html( $arrow_about_me ); ?></span>
			</div>
		</div>

		<div class="hero-content-wrapper">
			<div class="hero-arrow-degree">
				<span class="arrow-text note"><?php echo esc_html( $arrow_about_degree ); ?></span>
				<?php get_svg_icon('arrow-degree'); ?>
			</div>
			
			<h1 class="hero-title">
				<?php echo wp_kses_post( $home_title ); ?>
			</h1>

			<div class="hero-welcome-text">
				<p><?php echo wp_kses_post( $home_welcome_text ); ?></p>
			</div>
		</div>

	</div>
</section>

<section class="skills-section">
	<div class="skills-container">
		<div class="skills-list">
			<div class="skill-item skill-react">
				<span class="skill-text">React</span>
				<div class="draw-circle">
					<?php get_svg_icon('round-outline-small'); ?>
				</div>
			</div>
			
			<div class="skill-item">
				<span class="skill-text">TypeScript</span>
			</div>

			<div class="skill-item">
				<span class="skill-text">Python</span>
			</div>
			
			<div class="skill-item skill-wp">
				<span class="skill-text">WordPress</span>
				
				<div class="wp-note">
					<span class="wp-note-text note"><?php echo esc_html( $arrow_about_technology ); ?></span>
					<?php get_svg_icon('arrow-wp'); ?>
				</div>
			</div>
			
			<div class="skill-item skill-llm">
				<span class="skill-text">AI-Integrations</span>
			</div>
		</div>
	</div>
</section>

<section class="about-section">
	<div class="about-container">
		<div class="about-content">
			<div class="about-text-block">
				<?php echo wp_kses_post( $home_about ); ?>
			</div>

			<div class="about-action">
				<div class="about-decor-arrow">
					<?php get_svg_icon('arrow-curly-big'); ?>
				</div>

				<a href="<?php echo esc_url( $about_url ); ?>" class="btn-read-more">
					<span class="btn-text">[ read_more ]</span>
					<div class="btn-circle-hover">
						<?php get_svg_icon('round-outline-big'); ?>
					</div>
				</a>
			</div>
		</div>
	</div>
</section>

<?php
if ( ! empty( $featured_projects ) && is_array( $featured_projects ) ) :
?>
<section class="featured-projects-section">
	<div class="featured-projects-container">

		<div class="featured-projects-grid projects-grid">
			<?php
			$project_index = 0;

			foreach ( $featured_projects as $post ) :
				setup_postdata( $post );

				$project_index++;
				$formatted_number = sprintf( '%02d', $project_index );

				$tech_array = array();
				$tech_names = array();

				$main_techs = get_field( 'project_main_technologies' );
				if ( ! empty( $main_techs ) && is_array( $main_techs ) ) {
					foreach ( $main_techs as $tech ) {
						$tech_array[] = strtolower( $tech->slug );
						$tech_names[] = $tech->name;
					}
				}

				$sec_techs = get_field( 'project_secondary_technologies' );
				if ( ! empty( $sec_techs ) && is_array( $sec_techs ) ) {
					foreach ( $sec_techs as $tech ) {
						$tech_array[] = strtolower( $tech->slug );
					}
				}

				$type_attr    = '';
				$project_type = get_field( 'project_type' );
				if ( ! empty( $project_type ) && is_object( $project_type ) ) {
					$type_attr = strtolower( $project_type->slug );
				}

				$data_tech_attr = implode( ' ', array_unique( $tech_array ) );

				$gallery_images = array();
				if ( has_post_thumbnail() ) {
					$gallery_images[] = get_the_post_thumbnail_url( get_the_ID(), 'large' );
				}
				for ( $i = 1; $i <= 3; $i++ ) {
					$img = get_field( 'project_preview_image_' . $i );
					if ( ! empty( $img ) ) {
						$gallery_images[] = is_array( $img ) ? $img['url'] : $img;
					}
				}

				get_template_part( 'template-parts/project-card', null, array(
					'formatted_number'  => $formatted_number,
					'data_tech_attr'    => $data_tech_attr,
					'type_attr'         => $type_attr,
					'card_bg'           => get_field( 'project_card_bg' ),
					'short_description' => get_field( 'short_description' ),
					'gallery_images'    => $gallery_images,
					'project_add'       => get_field( 'project_add' ),
					'tech_names'        => $tech_names,
				) );

			endforeach;
			wp_reset_postdata();
			?>
		</div>

		<div class="featured-projects-action">
			<a href="<?php echo esc_url( $projects_url ); ?>" class="btn-view-all">
				<span class="btn-text">[ view_all_cases ]</span>
			</a>
			<div class="btn-underline-hover">
				<?php get_svg_icon('underline'); ?>
			</div>
		</div>

	</div>
</section>
<?php endif; ?>

<?php
get_template_part(
	'template-parts/contacts-callout',
	null,
	array(
		'title'  => get_field( 'home_contacts' ),
		'layout' => 'home',
	)
);

get_footer();
?>
