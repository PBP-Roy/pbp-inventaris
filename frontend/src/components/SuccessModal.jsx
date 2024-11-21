import './SuccessModal.css';

export default function SuccessModal() {
	return (
		<>
			<div id="success_tic" class="modal fade" role="dialog">
				<div class="modal-dialog">
					<div class="modal-content">
						<a class="close" href="#" data-dismiss="modal">
							&times;
						</a>
						<div class="page-body">
							<div class="head">
								<h3 style="margin-top:5px;">Success</h3>
								<h4>Inventory Successfully Updated</h4>
							</div>
							<h1 style="text-align:center;">
								<div class="checkmark-circle">
									<div class="background"></div>
									<div class="checkmark draw"></div>
								</div>
							</h1>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
