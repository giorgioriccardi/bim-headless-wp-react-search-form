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
            <a href="{{post.post_link}}">
        <# } #>
            <div class="reactiveProductReviewInfo">
              <div class="product-review-info">
                <# if(post.post_title) { #>
                    <div class="post-title">{{ post.post_title }}</div>
                    <div>
                        <p>business_name: {{ post.meta.business_name }}</p>
                        <p>licence_number: {{ post.meta.licence_number }}</p>
                        <p>licence_status: {{ post.meta.licence_status }}</p>
                        <p>business_phone: {{ post.meta.business_phone }}</p>
                        <p>business_owner: {{ post.meta.business_owner }}</p>
                        <p>email_address: {{ post.meta.email_address }}</p>
                        <p>website_address: {{ post.meta.website_address }}</p>
                        <p>business_address: {{ post.meta.business_address }}</p>
                        <p>naics_code: {{ post.terms.naics_code[0].name }}</p>
                    </div>
                <# } #>

                <# if(post.comment_author || post.comment_date) { #>
                    <div class="product-meta">
                    <# if(post.comment_author) { #>
                        <h5><strong>Author: </strong> {{ post.comment_author }}</h5>
                    <# } #>

                    <# if(post.comment_date) { #>
                          <h5><strong>Date: </strong> {{ post.comment_date }}</h5>
                    <# } #>
                   </div>
                 <# } #>

                <# if(post.comment_content) { #>
                    <p class="comment-data">{{ post.comment_content }}</p>
                <# } #>
              </div>
            </div>
          </a>
        </div>
        <!-- Grid End -->
    <# }) #>
   </div>
</div>