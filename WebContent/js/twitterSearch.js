/**
 * メインの処理を記述
 */

$(function() {



});


function search(){
	$("#resultBox").html("");
	var keyword=$("#searchBox").val();

	var url = "http://search.twitter.com/search.json?callback=?";
	var param = {
		q : keyword,
		rpp : 100,
		page : 5
	};
	$.getJSON(url, param, function(json) {

		$("#resultBox").append("<b>" + json.results.length + "件ヒット</b><br>");


		for ( var i = 0; i < json.results.length; i++) {

			$("#resultBox").append(json.results[i].from_user);
			$("#resultBox").append(" ");
			$("#resultBox").append(dateString(json.results[i].created_at));
			$("#resultBox").append("<br>");
			$("#resultBox").append(json.results[i].text);
			$("#resultBox").append("<br>");
			$("#resultBox").append(json.results[i].geo);
			if(json.results[i].geo != null){
				$("#resultBox").append('<font color="red">位置情報が付与されてます。</font><br>');
			}
			$("#resultBox").append("<br><br>");
		}
	});
}


function dateString (_created_at) {
	// 日時データを要素分解
	var created_at = _created_at.split(" ");

	// 投稿日時変換 "Mon Dec 01 14:24:26 +0000 2008" -> "Dec 01, 2008 14:24:26"
	var post_date  = created_at[1] + " "
	               + created_at[2] + ", "
	               + created_at[5] + " "
	               + created_at[3];
	var hms = created_at[4].split(":");

	// 日時データ処理
	var youbiAr = new Array("日","月","火","水","木","金","土");

	var date = new Date(post_date);     // 日付文字列 -> オブジェクト変換
	date.setHours(parseInt(hms[0]) + 9); // UTC -> JST (+9時間)
	var year = date.getFullYear();
	var mon  = date.getMonth() + 1;     // 月取得
	var day  = date.getDate();          // 日取得
	var hour = date.getHours();
	var minute = hms[1];
	var second = hms[2];
	var youbi = youbiAr[date.getDay()];

	var returnSt = year + "年" + mon + "月" + day + "日" + hour + "時" + minute + "分" + second + "秒" + "  " + youbi + "曜日";

	return returnSt;

}