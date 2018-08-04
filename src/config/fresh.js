function fresh(){
	if( window.location.pathname !=='/main'){
		window.onload=function(){
			window.location.href="/main";
		}
	}
}

export default fresh;