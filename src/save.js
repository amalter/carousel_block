/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( props ) {
	const {
		attributes: { block_id, arrow_position, set_axis, controls_position }
	} = props;

const arrowPosition = `arrow-position_${arrow_position}`;
const vertical_carousel = set_axis === 'vertical' ? 'vertical-carousel' : '';

	return (
			<div { ...useBlockProps.save({ id:block_id, className: `${arrowPosition} ${vertical_carousel}` } ) } >
				<div className="uwkc-carousel">
					<InnerBlocks.Content />	
				</div>
			</div>
	);
}
