<?php
/**
 * Generate MetaBox
 */

namespace Reactive\Admin;

class RedQ_Generate_MetaBox {

  public function __construct( $args ) {
    $this->generate_metabox( $args );
  }

  public function generate_metabox( $args ) {
    if( !empty( $args ) ){
      foreach ( $args as $key => $arg ) {

        if( isset( $arg['meta_preview'] ) ) {
          add_meta_box( $arg['id'], __($arg['name'], 'scholarwp'),
                array( $this , 'scholar_render_dynamic_meta_box') ,
                $arg['post_type'], 'normal', $arg['position'], array( 'path' => $arg['template_path'], 'meta_preview' => $arg['meta_preview'] ) );
        } else {
          add_meta_box( $arg['id'], __($arg['name'], 'scholarwp'),
              array( $this , 'scholar_render_meta_box') ,
              $arg['post_type'], 'normal', $arg['position'], array( 'path' => $arg['template_path'] ) );
        }

      }
    }
  }

  public function scholar_render_meta_box( $post, $template ) {
    include_once( RE_DIR. '/admin/admin-template/'.$template['args']['path'] );
  }

  public function scholar_render_dynamic_meta_box( $post, $template ) {
    require( RE_DIR. '/admin/admin-template/'.$template['args']['path'] );
  }
}
