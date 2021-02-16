import React from "react";
import { useHistory } from "react-router-dom";
import "./styles.scss";
function Home() {
	const history = useHistory();
	return (
		<div>
			<div className='btn-cont'>
				<button
					id='home-btn'
					onClick={(e: any) => history.push("/signup")}>
					AUTH
				</button>
			</div>
		</div>
	);
}

export default Home;
