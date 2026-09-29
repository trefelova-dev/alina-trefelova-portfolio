<?php
/**
 * Alina Trefelova Portfolio
 * © 2026 Alina Trefelova / ATcode. All rights reserved.
 * Template Name: About Page
 *
 * @package WordPress
 * @subpackage Portfolio_Theme
 * @since 1.0.0
 * @author Alina Trefelova / ATcode
 * @description Шаблон страницы "Обо мне" с информацией об образовании и технологическим стеком.
 */

get_header();

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

$about_title        = get_field( 'about_title' );
$about_welcome_text = get_field( 'about_welcome_text' );
$about_photo        = get_field( 'about_photo' );
$fun_fact           = get_field( 'fun_fact' );

$academic_background_note = get_field( 'academic_background_note' );
$bachelor_title          = get_field( 'bachelor_title' );
$diploma_name            = get_field( 'diploma_name' );
$diploma_tag             = get_field( 'diploma_tag' );
$diploma_note            = get_field( 'diploma_note' );
$retraining_title        = get_field( 'retraining_title' );
$programming_name        = get_field( 'programming_name' );
$neural_networks_name    = get_field( 'neural_networks_name' );
$neural_networks_note    = get_field( 'neural_networks_note' );
$cv_title                = get_field( 'cv_title' );
$cv_btn                  = get_field( 'cv_btn' );
$cv_file  = get_field( 'cv_file' );

$about_technologies = get_field( 'about_technologies' );
$technologies_note  = get_field( 'technologies_note' );

$cv_file_url = '';
if ( ! empty( $cv_file ) ) {
    $cv_file_url = is_array( $cv_file ) ? ( $cv_file['url'] ?? '' ) : $cv_file;
}

$tech_frontend = ! empty( $about_technologies['home_technologies_frontend'] ) ? $about_technologies['home_technologies_frontend'] : array();
$tech_backend  = ! empty( $about_technologies['home_technologies_backend'] ) ? $about_technologies['home_technologies_backend'] : array();
$tech_wp       = ! empty( $about_technologies['home_technologies_wordpress'] ) ? $about_technologies['home_technologies_wordpress'] : array();
$tech_ai       = ! empty( $about_technologies['home_technologies_ai'] ) ? $about_technologies['home_technologies_ai'] : array();
?>

<section class="about-hero-section page-hero has-wavy-bottom">
	<div class="about-hero-container">
		
		<div class="about-hero-content">
			<?php if ( $about_title ) : ?>
				<h1 class="about-hero-title"><?php echo esc_html( $about_title ); ?></h1>
			<?php endif; ?>

			<?php if ( $about_welcome_text ) : ?>
				<div class="about-hero-text">
					<?php echo wp_kses_post( wpautop( $about_welcome_text ) ); ?>
				</div>
			<?php endif; ?>
		</div>

		<div class="about-hero-photo-wrapper">
            <?php if ( $about_photo ) : 
                $photo_url = is_array( $about_photo ) ? $about_photo['url'] : $about_photo;
                $photo_alt = is_array( $about_photo ) && ! empty( $about_photo['alt'] ) ? $about_photo['alt'] : 'Алина';
            ?>
                <div class="about-hero-img-box">
                    <?php if ( $fun_fact ) : ?>
                        <div class="about-fun-fact">
                            <span class="fun-fact-text note"><?php echo esc_html( $fun_fact ); ?></span>
                            <div class="fun-fact-arrow">
                                <?php get_svg_icon( 'arrow-curly-small' ); ?>
                            </div>
                        </div>
                    <?php endif; ?>

                    <img src="<?php echo esc_url( $photo_url ); ?>" alt="<?php echo esc_attr( $photo_alt ); ?>" class="about-main-img">
                </div>
            <?php endif; ?>
        </div>

	</div>
</section>

<section class="about-academic-section has-wavy-top">
	<div class="about-academic-container">
		
		<header class="academic-header">
			<h2 class="academic-title about-second-title">Academic Background</h2>
			<?php if ( $academic_background_note ) : ?>
				<p class="academic-subtitle note"><?php echo esc_html( $academic_background_note ); ?></p>
			<?php endif; ?>
		</header>

		<div class="academic-cards-grid">
			<div class="academic-card card-bachelor">
				<div class="card-decor-branch branch-top">
					<?php get_svg_icon( 'olive-branch' ); ?>
				</div>
				<div class="card-decor-branch branch-bottom">
					<?php get_svg_icon( 'olive-branch' ); ?>
				</div>

				<div class="card-content">
					<?php if ( $bachelor_title ) : ?>
						<span class="card-category"><?php echo esc_html( $bachelor_title ); ?>:</span>
					<?php endif; ?>
					<?php if ( $diploma_name ) : ?>
						<h3 class="card-name"><?php echo esc_html( $diploma_name ); ?></h3>
					<?php endif; ?>
					<?php if ( $diploma_tag ) : ?>
						<span class="card-tag">[<?php echo esc_html( $diploma_tag ); ?>]</span>
					<?php endif; ?>
				</div>
				<div class="card-illustration card-diploma-open">
					<?php get_svg_icon( 'diploma-hero' ); ?>
				</div>

				<?php if ( $diploma_note ) : ?>
					<div class="academic-note-diploma">
						<span class="note"><?php echo esc_html( $diploma_note ); ?></span>
						<div class="note-arrow">
							<?php get_svg_icon( 'arrow-curly-small' ); ?>
						</div>
					</div>
				<?php endif; ?>
			</div>

			<div class="academic-card card-programming">
				<div class="card-content">
					<?php if ( $retraining_title ) : ?>
						<span class="card-category"><?php echo esc_html( $retraining_title ); ?>:</span>
					<?php endif; ?>
					<?php if ( $programming_name ) : ?>
						<h3 class="card-name"><?php echo esc_html( $programming_name ); ?></h3>
					<?php endif; ?>
				</div>
				<div class="card-illustration card-diploma-closed">
					<?php get_svg_icon( 'diploma-second' ); ?>
				</div>
			</div>

			<div class="academic-card card-neural">
				<div class="card-content">
					<?php if ( $retraining_title ) : ?>
						<span class="card-category"><?php echo esc_html( $retraining_title ); ?>:</span>
					<?php endif; ?>
					<?php if ( $neural_networks_name ) : ?>
						<h3 class="card-name"><?php echo wp_kses_post( $neural_networks_name ); ?></h3>
					<?php endif; ?>
				</div>
				<div class="card-illustration card-diploma-closed">
					<?php get_svg_icon( 'diploma-second' ); ?>
				</div>

				<?php if ( $neural_networks_note ) : ?>
					<div class="academic-note-neural">
						<span class="note"><?php echo esc_html( $neural_networks_note ); ?></span>
						<div class="note-arrow">
							<?php get_svg_icon( 'arrow-wp' ); ?>
						</div>
					</div>
				<?php endif; ?>
			</div>
		</div>

		<div class="academic-cv-action">
			<?php if ( $cv_title ) : ?>
				<span class="cv-action-title note"><?php echo esc_html( $cv_title ); ?></span>
			<?php endif; ?>
			
			<div class="cv-action-arrow arrow-desktop">
				<?php get_svg_icon( 'arrow-cv' ); ?>
			</div>
			<div class="cv-action-arrow arrow-mobile">
				<?php get_svg_icon( 'arrow-curly-small' ); ?>
			</div>

			<a href="<?php echo esc_url( $cv_file_url ? $cv_file_url : '#cv-download' ); ?>" <?php echo $cv_file_url ? 'download' : ''; ?> class="btn-cv">
				<span class="btn-cv-text"><?php echo esc_html( $cv_btn ? $cv_btn : 'Скачать CV' ); ?></span>
				<div class="btn-cv-icon">
					<?php get_svg_icon( 'cv-icon' ); ?>
				</div>
			</a>
		</div>
	</div>
</section>

<section class="about-toolbox-section">
	<div class="about-toolbox-container">
		
		<h2 class="toolbox-section-title about-second-title">The Full Toolbox</h2>

		<div class="toolbox-groups-grid">
			<?php if ( ! empty( $tech_frontend ) ) : ?>
				<div class="toolbox-col">
					<h3 class="toolbox-col-title">[frontend]</h3>
					<ul class="toolbox-list">
						<?php foreach ( $tech_frontend as $term ) : 
							$icon_svg = get_field( 'project_technology_icon', $term );
						?>
							<li class="toolbox-item">
								<?php if ( $icon_svg ) : ?>
									<span class="item-icon"><?php echo $icon_svg; ?></span>
								<?php endif; ?>
								<span class="item-name"><?php echo esc_html( $term->name ); ?></span>
							</li>
						<?php endforeach; ?>
					</ul>
				</div>
			<?php endif; ?>

			<?php if ( ! empty( $tech_backend ) ) : ?>
				<div class="toolbox-col">
					<h3 class="toolbox-col-title">[backend_&_bots]</h3>
					<ul class="toolbox-list">
						<?php foreach ( $tech_backend as $term ) : 
							$icon_svg = get_field( 'project_technology_icon', $term );
						?>
							<li class="toolbox-item">
								<?php if ( $icon_svg ) : ?>
									<span class="item-icon"><?php echo $icon_svg; ?></span>
								<?php endif; ?>
								<span class="item-name"><?php echo esc_html( $term->name ); ?></span>
							</li>
						<?php endforeach; ?>
					</ul>
				</div>
			<?php endif; ?>

			<?php if ( ! empty( $tech_wp ) ) : ?>
				<div class="toolbox-col toolbox-col-wp">
					<h3 class="toolbox-col-title">[wordpress]</h3>
					<ul class="toolbox-list">
						<?php foreach ( $tech_wp as $term ) : 
							$icon_svg = get_field( 'project_technology_icon', $term );
						?>
							<li class="toolbox-item">
								<?php if ( $icon_svg ) : ?>
									<span class="item-icon"><?php echo $icon_svg; ?></span>
								<?php endif; ?>
								<span class="item-name"><?php echo esc_html( $term->name ); ?></span>
							</li>
						<?php endforeach; ?>
					</ul>
				</div>
			<?php endif; ?>

			<?php if ( ! empty( $tech_ai ) ) : ?>
				<div class="toolbox-col toolbox-col-ai">
					<h3 class="toolbox-col-title">[ai_&_infra]</h3>
					<ul class="toolbox-list">
						<?php foreach ( $tech_ai as $term ) : 
							$icon_svg = get_field( 'project_technology_icon', $term );
						?>
							<li class="toolbox-item">
								<?php if ( $icon_svg ) : ?>
									<span class="item-icon"><?php echo $icon_svg; ?></span>
								<?php endif; ?>
								<span class="item-name"><?php echo esc_html( $term->name ); ?></span>
							</li>
						<?php endforeach; ?>
					</ul>

					<?php if ( $technologies_note ) : ?>
						<div class="toolbox-note">
							<div class="toolbox-arrow">
								<?php get_svg_icon( 'arrow-degree' ); ?>
							</div>
							<span class="note"><?php echo esc_html( $technologies_note ); ?></span>
						</div>
					<?php endif; ?>
				</div>
			<?php endif; ?>
		</div>

	</div>
</section>

<section class="about-signature">
	<div class="about-signature-container">
		<div class="signature-wrapper">
			<span class="signature-text script-font note">Alina T.</span>
			<div class="signature-underline">
				<?php get_svg_icon( 'underline-signature' ); ?>
			</div>
		</div>
	</div>
</section>

<?php
get_footer();
?>