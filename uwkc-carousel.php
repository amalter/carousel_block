<?php
/**
 * Plugin Name:       UWKC Carousel
 * Description:       Example block written with ESNext standard and JSX support – build step required.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       uwkc-carousel
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/writing-your-first-block-type/
 */
function create_block_uwkc_carousel_block_init() {
	register_block_type( __DIR__ , array(
		'render_callback' => 'uwkc_carousel_block_render_callback'
	));
}
add_action( 'init', 'create_block_uwkc_carousel_block_init' );


/**
 * Build 
 * Returns block attributes array.
 * 
 * $attributes - array - Block attributes.
 */
function uwkc_carousel_block_attributes($blocks ) {

	$attributes_Array = array();

    foreach ( $blocks as $block ) {

        if ( 'create-block/uwkc-carousel' === $block['blockName'] ) {
            $attributes_Array[] =  $block['attrs'];
        } elseif ( ! empty( $block['innerBlocks'] ) ) {
            // or call the function recursively, to find carousel block in inner blocks
            $attributes_Array = array_merge( $attributes_Array, uwkc_carousel_block_attributes( $block['innerBlocks'] ) );
        }   

    }

	return $attributes_Array;
}



function uwkc_carousel_block_render_callback( $attributes, $content, $block ) {
		global $post;
		$blocks = parse_blocks( $post->post_content );

		$carousel_settings = uwkc_carousel_block_attributes($blocks);

		if( !is_admin() ) {

			wp_enqueue_script(
				'uwkc-carousel-tiny-slider',
				plugins_url('assets/tiny-slider/tiny-slider.js', __FILE__ ),
			);
			wp_enqueue_style(
				'uwkc-carousel-tiny-slider',
				plugins_url('assets/tiny-slider/tiny-slider.css', __FILE__ ),
			);

			wp_enqueue_script(
				'uwkc-carousel-frontend',
				plugins_url('assets/frontend.js', __FILE__ ),
			);

			wp_localize_script(
				'uwkc-carousel-frontend',
				'carousel_settings',
				$carousel_settings
			);

		
			return $content;
		
		}//if frontend
}