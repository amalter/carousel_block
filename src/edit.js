/**
 * 
 * This is the parent block for the carousel block
 * 
 */

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, InspectorControls} from '@wordpress/block-editor';
import { ToggleControl, RangeControl, RadioControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
const ALLOWED_BLOCKS = [ 'create-block/uwkc-carousel-slide' ];
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import './inner-slide.js';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {
	const { 
		attributes: { 
			block_id, 
			auto_play, 
			slide_count, 
			edge_padding, 
			set_mode, 
			set_axis,
			set_gutter,
			show_arrows,
			arrow_position
		},
		setAttributes,
	} = props;

	var clientId = props.clientId;
	useEffect(() => {
		setAttributes({ block_id : `uwkc-carousel-block_${clientId}`})
	  },[]);

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<div id="uwkc-carousel-controls">
					<fieldset id="uwkc-carousel-controls_mode">
						<div className="blocks-base-control__radio">
							<RadioControl
								label="Slideshow Mode"
								selected={ set_mode }
								onChange={ set_mode => setAttributes({ set_mode }) }
								options={ [
									{ label: 'Carousel', value: 'carousel' },
									{ label: 'Gallery', value: 'gallery' },
								] }
							/>
						</div>
					</fieldset>
					<fieldset id="uwkc-carousel-controls_axis">
						<div className="blocks-base-control__radio">
							<RadioControl
								label="Slideshow Axis"
								selected={ set_axis }
								onChange={ set_axis => setAttributes({ set_axis }) }
								options={ [
									{ label: 'Horizontal', value: 'horizontal' },
									{ label: 'Vertical', value: 'vertical' },
								] }
							/>
						</div>
					</fieldset>
					<fieldset id="uwkc-carousel-controls_autoplay">
						<legend className="blocks-base-control__label">
							{ __( 'Autoplay', 'uwkc-carousel' ) }
						</legend>
						<ToggleControl
							label={
								auto_play
									? 'Autoplay is on'
									: 'Autoplay is off'
							}
							checked={ auto_play }
							onChange={ auto_play => setAttributes({ auto_play }) }
						/>
					</fieldset>
					<fieldset id="uwkc-carousel-controls_gutter">
						<legend className="blocks-base-control__label">
							{ __( 'Gutter', 'uwkc-carousel' ) }
						</legend>
						<ToggleControl
							label={
								set_gutter
									? 'Add gutter'
									: 'No gutter'
							}
							checked={ set_gutter }
							onChange={ set_gutter => setAttributes({ set_gutter }) }
						/>
					</fieldset>
					<fieldset id="uwkc-carousel-controls_slide-count">
						<RangeControl
							label="Slide Display"
							value={ slide_count }
							onChange={ slide_count => setAttributes({ slide_count }) }
							min={ 1 }
							max={ 5 }
						/>
					</fieldset>
					<fieldset id="uwkc-carousel-controls_edge-padding">
						<RangeControl
							label="Edge Padding"
							value={ edge_padding }
							onChange={ edge_padding => setAttributes({ edge_padding }) }
							min={ 0 }
							max={ 50 }
						/>
					</fieldset>
					<fieldset id="uwkc-carousel-controls_show-arrows">
						<legend className="blocks-base-control__label">
							{ __( 'Control Arrows', 'uwkc-carousel' ) }
						</legend>
						<ToggleControl
							label={
								show_arrows
									? 'Show Arrows'
									: 'Hide Arrows'
							}
							checked={ show_arrows }
							onChange={ show_arrows => setAttributes({ show_arrows }) }
						/>
					</fieldset>
					{
						show_arrows && set_axis === 'horizontal' ? (
							<fieldset id="uwkc-carousel-controls_arrow-position">
								<div className="blocks-base-control__radio">
									<RadioControl
										label="Arrow Position"
										selected={ arrow_position }
										onChange={ arrow_position => setAttributes({ arrow_position }) }
										options={ [
											{ label: 'Bottom', value: 'bottom' },
											{ label: 'Middle', value: 'middle' },
										] }
									/>
								</div>
							</fieldset>
						) : ''
					}
				</div>
			</InspectorControls>
			<h3 className="block-title">UWKC Carousel Block</h3>
			<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					renderAppender={ InnerBlocks.ButtonBlockAppender }
				/>			
		</div>
	);
}
