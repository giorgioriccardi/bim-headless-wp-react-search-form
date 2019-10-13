<?php

add_action('reactive_preview_template', 'reactive_preview_template_plugin');

function reactive_preview_template_plugin() {

$args = array(
	'post_type'			=> 'reactive_grid',
	'post_per_page'	=>	-1,
	'numberposts'		=>	-1,
);
$all_posts = get_posts($args);
foreach ($all_posts as $post) {
	$postId = $post->ID;
	//$postName = $post->post_name;
	$postName = 'grid_'. str_replace("-", "", $post->post_name);
	$gridTemplate = get_post_meta($postId, 'reactive_grid_template');
	?>
	<script type="text/html" id="tmpl-<?php echo $postName ?>-template">
		<?php echo $gridTemplate[0] ?>
	</script>
	<?php
}

?>

<!-- 	<script type="text/html" id="tmpl-gridbasic-template">
	  <div class="reactive-container-fluid">
      <# if(data.view == 'list') { #>
          <div class="reactive-row {{ data.listClass }}">
      <# } else { #>
          <div class="reactive-row">
      <# } #>
      <# _.each(data.posts, function( post ) { #>
        <div key=src={{ post.ID }} data-uid={{ post.ID }} class="{{data.columnClass}} reativeinfoWindowPopUp reactiveGridType-basic">
          <div id="results" class="reactiveGridImage">
          	<div class="fusionRollover">
            <div class="rolloverContent">
                   <div class="flexLink">
                  <a href="{{post.post_link}}" class="link">
                  	<i class="ion-link"></i>
                  </a>
                  <a href="#" class="gallery">
                  	<i class="ion-ios-search-strong"></i>
                  </a>
                </div>
              <h4><a href="#"> Blog Image Post </a></h4>
              <p><a href="#">Creative, </a><a href="#">Wordpress</a></p>
            </div>
          	</div>
            <img src={{ post.thumb_url }}>
        	</div>
	        <div class="reactiveGridContents">
	          <div class="reactiveGridContentTop">
	              <h3 class="reactiveProductTitle">
	                  <a href="{{post.post_link}}">{{post.post_title}}</a>
	              </h3>
	              <span class="reactiveProductPrice">${{post.meta._price}}</span>
	          </div>
	          <div class="reactiveGridContentBottom">
	              <a data-id={{post.ID}} href="#" class="reactiveAddToCart">Add to cart</a>
	              <div class="reactiveRatingPro">
	              <# _.each([1,2,3,4,5], function( num ) { #>
	                  <# if(num <= parseFloat(post.meta._wc_average_rating, 10)) { #>
	                      <span class="star ratingOne"></span>
	                  <# } else if((num > parseFloat(post.meta._wc_average_rating, 10)) && ((num-1 < parseFloat(post.meta._wc_average_rating, 10)))) { #>
	                      <span class="star ratingHalf"></span>
	                  <# } else { #>
	                      <span class="star ratingNone"></span>
	                  <# } #>
	              <# }) #>
	              </div>
	          </div>
	        </div>
    		</div>
				<# }) #>
      </div>
	  </div>
	</script>

 	<script type="text/html" id="tmpl-gridwoocommerce-template">
		<div class="reactive-container-fluid">
			<# if(data.view == 'list') { #>
			<div class="reactive-row {{ data.listClass }}">
			<# } else { #>
			<div class="reactive-row">
			<# } #>
			<# _.each(data.posts, function( post ) { #>
				<div key=src={{ post.ID }} data-uid={{ post.ID }} class=" reactiveHoverClass reativeinfoWindowPopUp {{data.columnClass}} reactiveGridType-wooCommerce">
					<# if(post.meta._product_image_gallery_links && post.meta._product_image_gallery_links.length) { #>
						<div class="reactiveGridImage owl-carousel owl-theme">
							<# _.each(post.meta._product_image_gallery_links, function( image ) { #>
								<div class="overlay"></div>
								<a class="reactiveImagePopup" href={{image}}>
									<img class="item" src={{ image }}>
								</a>
								<span class="productRating">
	                <i class="ion-android-star-outline" aria-hidden="true"></i>
	                <i class="ion-android-star-outline" aria-hidden="true"></i>
	                <i class="ion-android-star-outline" aria-hidden="true"></i>
	                <i class="ion-android-star-outline" aria-hidden="true"></i>
	                <i class="ion-android-star-outline" aria-hidden="true"></i>
	              </span>
							<# }) #>
						</div>
					<# } else { #>
						<div class="reactiveGridImage">
							<div class="overlay"></div>
							<a class="reactiveImagePopup" href={{post.thumb_url}}>
								<img class="item" src={{ post.thumb_url }}>
								<span>
									<i class="ion-plus-round"></i>
								</span>
							</a>
	            <span class="productRating">
	              <i class="ion-android-star-outline" aria-hidden="true"></i>
	              <i class="ion-android-star-outline" aria-hidden="true"></i>
	              <i class="ion-android-star-outline" aria-hidden="true"></i>
	              <i class="ion-android-star-outline" aria-hidden="true"></i>
	              <i class="ion-android-star-outline" aria-hidden="true"></i>
	            </span>
	          </div>
					<# } #>

	        <div class="reactiveGridContents">
	          <h3 class="reactiveProductTitle">
	            <a href="#">Levi's Muscle Tank</a>
	          </h3>
	          <p class="reactivePrice">$57.80</p>
	        </div>
				</div>
			<# }) #>
			</div>
		</div>
	</script>

	<script type="text/html" id="tmpl-gridproduct-template">
		<div class="reactive-container-fluid">
			<# if(data.view == 'list') { #>
			<div class="reactive-row   {{ data.listClass }}">
			<# } else { #>
			<div class="reactive-row  ">
			<# } #>
				<# _.each(data.posts, function( post ) { #>
					<div key=src={{ post.ID }} data-uid={{ post.ID }} class=" reactiveHoverClass reativeinfoWindowPopUp {{data.columnClass}} reactiveGridType-product">
						<# if(post.meta._product_image_gallery_links && post.meta._product_image_gallery_links.length) { #>

							<div class="reactiveGridImage owl-carousel owl-theme">
								<div class="overlay"></div>
								<# _.each(post.meta._product_image_gallery_links, function( image ) { #>
									<a class="reactiveImagePopup" href={{image}}>
										<img class="item" src={{ image }}>
										<a href="{{post.post_link}}" class="reactivePostLink">
											<i class="ion-link"></i>
										</a>
									</a>
								<# }) #>
							</div>
						<# } else { #>

							<div class="reactiveGridImage">
								<div class="overlay"></div>
								<a class="reactiveImagePopup" href={{post.thumb_url}}>
									<img class="item" src={{ post.thumb_url }}>
									<a href="{{post.post_link}}" class="reactivePostLink">
										<i class="ion-link"></i>
									</a>
								</a>
							</div>
							<# } #>

	            <div class="reactiveGridContents">
	              <div class="reactiveFlex">
	                <h3 class="reactiveProductTitle">
	                  <a href="#">Levi's Muscle Tank</a>
	                </h3>
	                <span class="productRating">
	                  <i class="fa fa-star-o" aria-hidden="true"></i>
	                  <i class="fa fa-star-o" aria-hidden="true"></i>
	                  <i class="fa fa-star-o" aria-hidden="true"></i>
	                  <i class="fa fa-star-o" aria-hidden="true"></i>
	                  <i class="fa fa-star-o" aria-hidden="true"></i>
	                </span>
	              </div>
	              <p class="reactivePrice">$57.80</p>
	            </div>
					</div>
				<# }) #>
			</div>
		</div>
	</script>

	<script type="text/html" id="tmpl-gridncode-template">
		<div class="reactive-container-fluid">
			<# if(data.view == 'list') { #>
			<div class="reactive-row reactiveGridBlock {{ data.listClass }}">
			<# } else { #>
			<div class="reactive-row reactiveGridBlock">
			<# } #>
			<# _.each(data.posts, function( post ) { #>
				<div data-uid={{ post.ID }}  class="{{data.columnClass}} reativeinfoWindowPopUp  reactiveGridTypeNcode">
					<div class="reactiveGridImage">
						<div class="overlay"></div>
						<img src={{ post.thumb_url }} alt="Grid Image">

						<a href="#" class="addToCart">Add to cart</a>
					</div>

					<div class="reactiveGridContents">
						<h3 class="reactiveProductTitle">
							<a href="{{post.post_link}}">{{post.post_title}}</a>
						</h3>
						<span class="reactiveProductPrice">${{post.meta._price}}</span>
						<a href="#" class="addToCart">Add to cart</a>
					</div>
				</div>
				<# }) #>
			</div>
		</div>
	</script>

	<script type="text/html" id="tmpl-gridavada-template">
	  <div class="reactive-container-fluid">
	    <# if(data.view == 'list') { #>
	      <div class="reactive-row {{ data.listClass }}">
	    <# } else { #>
	      <div class="reactive-row">
	    <# } #>
      <# _.each(data.posts, function( post ) { #>
        <div key=src={{ post.ID }} data-uid={{ post.ID }} class="{{data.columnClass}} reativeinfoWindowPopUp reactiveGridType-basic">
          <div id="results" class="reactiveGridImage">
            <div class="fusionRollover">
              <div class="rolloverContent">
                <div class="flexLink">
                  <a href="{{post.post_link}}" class="link">
                  	<i class="ion-link"></i>
                  </a>
                  <a href="#" class="gallery">
                  	<i class="ion-ios-search-strong"></i>
                  </a>
                </div>
                <h4><a href="#"> Blog Image Post </a></h4>
                <p><a href="#">Creative, </a><a href="#">Wordpress</a></p>
              </div>
            </div>
            <img src={{ post.thumb_url }}>
         	</div>
          <div class="reactiveGridContents">
              <div class="reactiveGridContentTop">
                  <h3 class="reactiveProductTitle">
                      <a href="{{post.post_link}}">{{post.post_title}}</a>
                  </h3>
                  <div class="reactiveMetaWrapper">
                    <span class="reactiveProductPrice">${{post.meta._price}}</span>
                    <div class="reactiveRatingPro">
                    <# _.each([1,2,3,4,5], function( num ) { #>
                        <# if(num <= parseFloat(post.meta._wc_average_rating, 10)) { #>
                            <span class="star ratingOne"></span>
                        <# } else if((num > parseFloat(post.meta._wc_average_rating, 10)) && ((num-1 < parseFloat(post.meta._wc_average_rating, 10)))) { #>
                            <span class="star ratingHalf"></span>
                        <# } else { #>
                            <span class="star ratingNone"></span>
                        <# } #>
                    <# }) #>
                    </div>
                   </div>
              </div>

              <div class="reactiveGridContentBottom">
                  <a data-id={{post.ID}} href="#" class="reactiveAddToCart">Add to cart</a>
                  <a href="{{post.post_link}}" class="reactiveDetails">Details</a>
              </div>
          </div>
        </div>
        <# }) #>
      </div>
	  </div>
	</script>

	<script type="text/html" id="tmpl-gridsimple-template">
	  <div class="reactive-container-fluid">
			<# if(data.view == 'list') { #>
				<div class="reactive-row reactiveGridBlock {{ data.listClass }}">
			<# } else { #>
				<div class="reactive-row reactiveGridBlock">
			<# } #>
			<# _.each(data.posts, function( post ) { #>
				<div data-uid={{ post.ID }} class="{{data.columnClass}} reativeinfoWindowPopUp reactiveGridType-Simple">
					<div class="reactiveGridImage">
						<img src={{ post.thumb_url }} alt="Grid Image">
	          <div class="overlay">
	          	<h3 class="reactiveTitle">Tesla Model X</h3>
	          </div>
	          <span class="reactiveDate">JUL 2016</span>
					</div>
				</div>
			<# }) #>
			</div>
		</div>
	</script> -->

<?php }
