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
				</a>
                  	<div>
                        <p>Business Name:
							<a href="{{post.post_link}}" title="{{post.meta.business_name}}">{{ post.meta.business_name }}</a>
						</p>

                        <# if(post.meta.business_phone) { #>
                            <div>
                                <p>Phone #:
                                    <a href="tel:{{post.meta.business_phone}}" title="Call {{post.meta.business_name}} at {{post.meta.business_phone}}">{{ post.meta.business_phone }}</a>
                                </p>
                            </div>
                        <# } else { #>
                            <p>Phone #: <em><small>not published</small></em></p>
                        <# } #>

						<# if(post.terms.post_tag) { #>
                            <div>
                                <p>Tag: <a href="/tag/{{post.terms.post_tag[0].slug}}" title="{{post.terms.post_tag[0].name}}">{{ post.terms.post_tag[0].name }}</a>
                                    </p>
                            </div>
                        <# } else { #>
                            <p>Tag: <em><small>not assigned</small></em></p>
                        <# } #>

                        <!--<p>licence_number: {{ post.meta.licence_number }}</p>-->
                        <!--<p>licence_status: {{ post.meta.licence_status }}</p>-->
                        <!--<p>business_owner: {{ post.meta.business_owner }}</p>-->
                        <!--<p>email_address: {{ post.meta.email_address }}</p>-->
                        <!--<p>website_address: {{ post.meta.website_address }}</p>-->
                        <!--<p>business_address: {{ post.meta.business_address }}</p>-->
						<p>Category:
                            <a href="/category/{{post.terms.category[0].slug}}" title="Listed as {{post.terms.category[0].name}} business">{{ post.terms.category[0].name }}</a>
                        </p>
                        <!--<p>NAICS: <a href="/naics_code/{{post.terms.naics_code[0].slug}}" title="{{post.terms.naics_code[0].name}}">{{ post.terms.naics_code[0].name }}</a>
						</p>-->
                    </div>
                <# } #>
              </div>
            </div>
        </div>
        <!-- Grid End -->
    <# }) #>
   </div>
</div>
