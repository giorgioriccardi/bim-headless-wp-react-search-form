<div class="reactive-container-fluid">
  <# if(data.view == 'list') { #>
  <div class="reactive-row reactiveGridBlock {{ data.listClass }}">
    <# } else { #>
    <div class="reactive-row reactiveGridBlock">
      <# } #>
      <# _.each(data.posts, function( post ) { #>
        <!-- Grid -->
        <# if(data.view == 'list') { #>
          <div key=src={{ post.ID }} data-uid={{ post.ID }} class="{{data.listColumnClass}} reactive-product-review-list reactive-product-review-listView fadeIn" data-wow-duration=".5s" data-wow-delay={{ post.delay}} >
            <a href="{{post.post_link}}">
        <# } else { #>
          <div key=src={{ post.ID }} data-uid={{ post.ID }} class="{{data.columnClass}} reactive-product-review-list reactive-product-review-gridView fadeIn" data-wow-duration=".5s" data-wow-delay={{ post.delay}} >
        <# } #>
            <div class="reactiveProductReviewInfo">
              <div class="product-review-info">
                <# if(post.post_title) { #>
              	<a href="{{post.post_link}}" title="{{post.post_title}}">
                    <h3 class="post-title">{{ post.post_title }}</h3>
                    <div>
                        <p>Business Name: {{ post.meta.business_name }}</p>
          			</div>
				</a>
                  	<div>
                        <p>Business Phone:
							<a href="tel:{{post.meta.business_phone}}" title="{{post.meta.business_phone}}">{{ post.meta.business_phone }}</a>
                        </p>
                        <!--<p>licence_number: {{ post.meta.licence_number }}</p>
                        <!--<p>licence_status: {{ post.meta.licence_status }}</p>-->
                        <!--<p>business_owner: {{ post.meta.business_owner }}</p>-->
                        <!--<p>email_address: {{ post.meta.email_address }}</p>-->
                        <!--<p>website_address: {{ post.meta.website_address }}</p>-->
                        <!--<p>business_address: {{ post.meta.business_address }}</p>-->
                        <!--<p>naics_code: {{ post.terms.naics_code[0].name }}</p>-->
                    </div>
                <# } #>
              </div>
            </div>
        </div>
        <!-- Grid End -->
    <# }) #>
   </div>
</div>
