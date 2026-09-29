<?php
/**
 * Alina Trefelova Portfolio Theme
 *
 * © 2026 Alina Trefelova. All rights reserved.
 * Author: Alina Trefelova / ATcode
 *
 * Шаблон карточки проекта (Project Card).
 *
 * @package portfolio-theme
 * @since 1.0.0
 *
 * @param array $args {
 *     Ожидаемые параметры в массиве аргументов:
 *     @type string $formatted_number  Форматированный номер проекта (например, '01', '02').
 *     @type string $data_tech_attr    Строка со слагами технологий для фильтрации.
 *     @type string $type_attr         Строка со слагами типов проекта (для Playground).
 *     @type string $card_bg           Цвет фона карточки.
 *     @type string $short_description Краткое описание / бейдж.
 *     @type array  $gallery_images    Массив URL-адресов изображений для галереи.
 *     @type string $project_add       Дополнительный текст/тип бейджа.
 *     @type array  $tech_names        Массив названий технологий.
 * }
 */

$formatted_number  = $args['formatted_number'] ?? '';
$data_tech_attr    = $args['data_tech_attr'] ?? '';
$type_attr         = $args['type_attr'] ?? '';
$card_bg           = $args['card_bg'] ?? '';
$short_description = $args['short_description'] ?? '';
$gallery_images    = $args['gallery_images'] ?? array();
$project_add       = $args['project_add'] ?? '';
$tech_names        = $args['tech_names'] ?? array();
?>

<article 
	class="project-card" 
	data-tech="<?php echo esc_attr($data_tech_attr); ?>" 
	data-type="<?php echo esc_attr($type_attr); ?>"
>
	<a href="<?php the_permalink(); ?>" class="project-card-link">

		<div class="project-card-media" style="--card-bg: <?php echo esc_attr($card_bg); ?>;">

			<?php if ($short_description) : ?>
				<div class="project-card-badge">
					<?php get_svg_icon('smear-pen', 'badge-bg'); ?>
					<span class="badge-text note"><?php echo esc_html($short_description); ?></span>
				</div>
			<?php endif; ?>

			<div class="project-card-number">
				<span>
					<?php echo esc_html($formatted_number); ?>
					<?php get_svg_icon('underline-number', 'number-underline'); ?>
				</span>
			</div>

			<div class="project-card-gallery">
				<?php if (!empty($gallery_images)) : ?>
					<?php foreach ($gallery_images as $index => $img_url) : ?>
						<img 
							src="<?php echo esc_url($img_url); ?>" 
							alt="<?php echo esc_attr(get_the_title()); ?>" 
							class="project-card-img <?php echo $index === 0 ? 'is-active' : ''; ?>"
							loading="lazy"
						/>
					<?php endforeach; ?>
				<?php endif; ?>
			</div>

			<?php if ($project_add) : ?>
				<div class="project-card-add <?php echo (mb_strtolower(trim($project_add)) === 'диплом') ? 'is-diploma' : 'is-text'; ?>">
					<?php if (mb_strtolower(trim($project_add)) === 'диплом') : ?>
						<div class="diploma-badge-wrapper">
							<?php get_svg_icon('diploma-seal-bg', 'badge-bg-black'); ?>
							<?php get_svg_icon('diploma-seal', 'badge-icon-white'); ?>
						</div>
					<?php else : ?>
						<span class="note badge-custom-text"><?php echo esc_html($project_add); ?></span>
					<?php endif; ?>
				</div>
			<?php endif; ?>

		</div>

		<div class="project-card-info">
			<h3 class="project-card-title"><?php the_title(); ?></h3>

			<?php if (!empty($tech_names)) : ?>
				<p class="project-card-techs">
					<?php echo esc_html(implode(' / ', $tech_names)); ?>
				</p>
			<?php endif; ?>
		</div>

	</a>
</article>
