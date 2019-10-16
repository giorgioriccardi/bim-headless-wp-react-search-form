<div class="reactive-container-fluid">
  <# if(data.view == 'list') { #>
  <div class="reactive-row reactiveGridBlock {{ data.listClass }}">
    <# } else { #>
    <div class="reactive-row reactiveGridBlock">
      <# } #>
      <# _.each(data.categories, function( category ) { #>
        <!-- Grid -->
        <# if(data.view == 'list') { #>
	      <div key=src={{ category.ID }} data-uid={{ category.ID }} class="{{data.listColumnClass}} reactiveGridType-Simple fadeIn">
	    <# } else { #>
	      <div key=src={{ category.ID }} data-uid={{ category.ID }} class="{{data.columnClass}} reactiveGridType-Simple fadeIn">
	    <# } #>
          <div class="">

              <h5 class="reactiveTitle">
                <a href="{{category.link}}" class="">{{ category.name }}</a>
              </h5>
         </div>
		</div>
		<!-- Grid End -->
	<# }) #>
   </div>
</div>
