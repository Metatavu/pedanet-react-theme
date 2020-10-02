<?php
/**
 * Header file for the Twenty Twenty WordPress default theme.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since Twenty Twenty 1.0
 */

?><!DOCTYPE html>

<html class="no-js" <?php language_attributes(); ?>>

	<head>

		<?php require get_template_directory() . '/inc/template-head-generic.php'; ?>

		<?php wp_head(); ?>

	</head>

	<body <?php body_class(); ?>>

		<?php
		wp_body_open();
		?>

		<div id="site-header" class="header-footer-group">
			<img src="<?php bloginfo('template_url') ?>/dist/bar.png" >

			<div class="header-inner section-inner">
			</div><!-- .header-inner -->

		</header><!-- #site-header -->

		<?php
