<?php include 'blocks/page_start.php' ?>

<main class="main" role="main">
	<div class="container">
    <div class="page-header">
  		<h1>Bonjour! <small>with Twitter Bootstrap</small></h1>
  	</div>
  	<blockquote>A bootstrapped template to kickstart frontend development.</blockquote>
	</div>

  <hr>

  <?php include 'blocks/_kitchen-sink.php' ?>
</main>

<button type="button" class="button" data-toggle="modal" data-target="#modal">Launch demo modal</button>
<div id="modal" class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Modal title</h4>
      </div>
      <div class="modal-body">
        <p>One fine body&hellip;</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="button" data-dismiss="modal">Close</button>
        <button type="button" class="button button--primary">Save changes</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<?php include 'blocks/page_end.php' ?>
