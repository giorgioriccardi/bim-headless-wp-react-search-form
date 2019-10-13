<!-- <?php
  // $reactive_data = get_option( 'reactive_data' );
  // $result = array();
  // if ($reactive_data) {
  //   $data = new \Reactive\Admin\Re_Admin_Provider();
  //
  //   $result = $data->get_post_data($reactive_data);
  //
  // }
  // wp_localize_script( 're-backend', 'REACTIVE_DATA', $result);

?> -->

<style>
.adminContainer{
  display: flex;
  width: 70%;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-top: 100px;
}

.adminGrid{
  width: 400px;
  height: auto;
  background: #fff;
  padding: 50px;
  margin:10px;
  text-align: center;
  border-bottom: 2px solid #ddd;
}
.adminGrid a {
  background: #e4e4e4;
  padding: 15px 30px;
  text-decoration: none;
  color: #000;
  font-size: 18px;
}
.adminGrid .gridContent {
  display: block;
  margin-bottom: 30px;
}

.addonsBttnAlt {
  width: 150px;
  margin-top: 10px;
}


</style>
<div class="adminContainer">
  <h1>Welcome to Reactive Pro</h1>
  <span>v3</span>
</div>
<div class="adminContainer">
  <div class="adminGrid">
    <h2>Reactive Pro Documentation</h2>
    <div class="gridContent"><p>Check our Documentation to get the better Understanding of Reactive Pro</p></div>
    <a href="https://redq.gitbooks.io/reactive-pro-advance-searching-filtering/" target="_blank" class="addonsBttn">Documentation</a>
  </div>
  <div class="adminGrid">
    <h2>Reactive Pro Support</h2>
    <div class="gridContent"><p>If you have any trouble in Understanding or Trobleshot Feel free to contact in our support forum</p></div>
    <a href="https://redqsupport.ticksy.com" target="_blank" class="addonsBttn">Support</a>
  </div>
  <div class="adminGrid">
    <h2>Generate: Post type, taxonomy, metabox, term meta</h2>
    <div class="gridContent"><p>If you have any trouble in Understanding or Trobleshot Feel free to contact in our support forum</p></div>
    <a href="https://wordpress.org/plugins/reuse-builder/" target="_blank" class="addonsBttn">Reuse Builder</a>
  </div>

  <!-- <div class="adminGrid">
    <h2>Please don't forget to install these helper plugins.</h2>
    <div class="gridContent"><p> To get the updated version download it from your envato account</p></div> <br />
    <a href="https://s3.amazonaws.com/redqteam.com/redq-reuse-form.zip" class="addonsBttnAlt">Reuse Form</a>
    <a href="https://s3.amazonaws.com/redqteam.com/googlemap.zip" class="addonsBttnAlt">Google Map</a>
  </div> -->
</div>
