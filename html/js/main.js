// Global variables //
var worker;
var account;
// Global variables //

// Развернуть всё
function buttonExecute(){
	var text = document.getElementById("button-13").firstChild;
	text.data = text.data == "Развернуть всё" ? "Свернуть всё" : "Развернуть всё";
	if (text.data === "Развернуть всё") {
		if($("#dddivheader img").hasClass("filtering")) {
			$('.open').treegrid('collapse');
		} else {
			$('.roootnode').treegrid('collapse');
		};
		if(!$(".button-14").hasClass("ext-close")) {
			$(".button-14").toggleClass("ext-close");
		}
		$(".selectable").toggleClass("selectable");
	} else {
		if($("#dddivheader img").hasClass("filtering")) {
			$('.open').treegrid('expand');
		} else {
			$('.roootnode').treegrid('expand');
		};
	}
}

// Сбросить выборку
function deSelect(){
	$(".button-14").toggleClass("ext-close");
	$(".selectable").toggleClass("selectable");
	$(".selecttd").toggleClass("selecttd");
}

// Main JS
$(document).ready(function() {
	// Initialize the plugin and done.
	$('.tree-basic').treegrid();
	// Work Plugin //
	$('.tree-load').treegrid({
		source: function(id, response) {
			if (id == 1) response([
				'<tr class="treegrid-3"><td>Loaded node 1-1</td></tr>',
				'<tr class="treegrid-4"><td>Loaded node 1-2</td></tr>'
			]);
			else response(['<tr class="treegrid-5"><td>Loaded node 2-1</td></tr>']);
		}
	});
	$('.tree-add').treegrid();
	$('.tree-add-root').click(function(e) {
		e.preventDefault();
		$('.tree-add').treegrid('add', ['<tr><td>Added root</td></tr>']);
	});
	$('.tree-add-node').click(function(e) {
		e.preventDefault();
		$(this).closest('tr').treegrid('add', ['<tr><td>Added node</td></tr>']);
	});

	$('.tree-remove').treegrid();
	$('.tree-remove-node').click(function(e) {
		e.preventDefault();
		if (confirm('Remove with its children?')) $(this).closest('tr').treegrid('remove');
	});

	$('.tree-move').treegrid({
		enableMove: true,
		onMoveOver: function(item, helper, target, position) {
			if (target.hasClass('treegrid-8')) return false;
			return true;
		}
	});
	$('.tree-move-node').click(function(e) {
		e.preventDefault();
		$('.tree-move .treegrid-8').treegrid('move', $('.tree-move .treegrid-2'), 2);
	});
	// Work Plugin //
	
	// Drug and Drop layers or blocks //
	dragElement(document.getElementById("dddiv"));
	dragElement(document.getElementById("lldiv"));
	function dragElement(elmnt) {
		var pos1 = 0,
			pos2 = 0,
			pos3 = 0,
			pos4 = 0;
		if (document.getElementById(elmnt.id + "header")) {
			document.getElementById(
				elmnt.id + "header"
			).onmousedown = dragMouseDown;
		} else {
			elmnt.onmousedown = dragMouseDown;
		}
		function dragMouseDown(e) {
			e = e || window.event;
			e.preventDefault();
			pos3 = e.clientX;
			pos4 = e.clientY;
			document.onmouseup = closeDragElement;
			document.onmousemove = elementDrag;
		}
		function elementDrag(e) {
			e = e || window.event;
			e.preventDefault();
			pos1 = pos3 - e.clientX;
			pos2 = pos4 - e.clientY;
			pos3 = e.clientX;
			pos4 = e.clientY;
			elmnt.style.top = elmnt.offsetTop - pos2 + "px";
			elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
		}
		function closeDragElement() {
			document.onmouseup = null;
			document.onmousemove = null;
		}
	}
	// Drug and Drop layers or blocks //
	
	// Фильтровать данные по соц. работнику //
	$(".worker ul.social li").on("click", function(){
		$(".open").toggleClass("open");
		$(".checked").toggleClass("checked");
		$(".notchecked").toggleClass("notchecked");
		$(".close").toggleClass("close");
		$(this).parents(".social").children("li").toggleClass("notchecked");
		$(this).toggleClass("notchecked").toggleClass("checked");
		worker = $(this).text();
		const rootnodes = document.querySelectorAll('.roootnode');
		for (let i = 0, length = rootnodes.length; i < length; i++) {
			if ($(rootnodes[i]).children("td:first-child").text() != worker) {
				$(rootnodes[i]).treegrid('collapse');
				$(rootnodes[i]).toggleClass("close");
			} else {
				if ($(rootnodes[i]).treegrid('isExpanded')) {
					$(rootnodes[i]).treegrid('collapse');
					$(rootnodes[i]).toggleClass("open");
					$('.open').treegrid('expand');
				} else {
					$(rootnodes[i]).toggleClass("open");
				};
			};
		};
		$(".no-filtering").toggleClass("no-filtering").toggleClass("filtering");
		$('.filtering').attr('src', './html/images/filter-clear.png');
		if(!$(".button-14").hasClass("ext-close")) {
			$(".button-14").toggleClass("ext-close");
		}
		$(".selectable").toggleClass("selectable");
		var textes = document.getElementById("button-13").firstChild;
		textes.data = "Развернуть всё"
	});	
	$("img.no-filtering").on("click", function(){
		$(".open").toggleClass("open");
		$(".checked").toggleClass("checked");
		$(".notchecked").toggleClass("notchecked");
		$(".close").toggleClass("close");
		$(".filtering").toggleClass("filtering").toggleClass("no-filtering");
		$('.no-filtering').attr('src', './html/images/filter.png');
		$('.roootnode').treegrid('collapse');
		var textes = document.getElementById("button-13").firstChild;
		textes.data = "Развернуть всё"
	});
	$("img.filtering").on("click", function(){
		$(".open").toggleClass("open");
		$(".checked").toggleClass("checked");
		$(".notchecked").toggleClass("notchecked");
		$(".close").toggleClass("close");
		$(".filtering").toggleClass("filtering").toggleClass("no-filtering");
		$('.no-filtering').attr('src', './html/images/filter.png');
		$('.roootnode').treegrid('collapse');
		var textes = document.getElementById("button-13").firstChild;
		textes.data = "Развернуть всё"
	});	
	// Фильтровать данные по соц. работнику //
	
	// Фильтровать по признаку учета //
	$(".rworker ul.rsocial li").on("click", function(){
		$(".onselect").toggleClass("onselect");
		$(".ondeselect").toggleClass("ondeselect");
		$(".nth-close").toggleClass("nth-close");
		$(this).parents(".rsocial").children("li").toggleClass("ondeselect");
		$(this).toggleClass("ondeselect").toggleClass("onselect");
		account = $(this).text();
		$(".childnode").each(function (index, value) {
			if ($(this).children("td.uchet").text() != account) {
				$(this).toggleClass("nth-close");
			};
		});
		$(".no-register").toggleClass("no-register").toggleClass("register");
		$('.register').attr('src', './html/images/filter-clear.png');
	});
	$("img.register").on("click", function(){
		$(".register").toggleClass("register").toggleClass("no-register");
		$('.no-register').attr('src', './html/images/filter.png');
		$(".onselect").toggleClass("onselect");
		$(".ondeselect").toggleClass("ondeselect");
		$(".nth-close").toggleClass("nth-close");
	});
	$("img.no-register").on("click", function(){
		$(".register").toggleClass("register").toggleClass("no-register");
		$('.no-register').attr('src', './html/images/filter.png');
		$(".onselect").toggleClass("onselect");
		$(".ondeselect").toggleClass("ondeselect");
		$(".nth-close").toggleClass("nth-close");
	});
	// Фильтровать по признаку учета //
	
	// Клики по ячейкам с данными //
	$("table.table tbody tr td").on("click", function(){
		if($(".button-14").hasClass("ext-close")) {
			$(".button-14").toggleClass("ext-close");
		}
		$(".selectable").toggleClass("selectable");
		$(".selecttd").toggleClass("selecttd");
		if(!$(this).parent().hasClass("roootnode")) {
			$(this).parent().toggleClass("selectable");
			$(this).toggleClass("selecttd");
		}
		if($(this).parent().treegrid('isCollapsed')) {
			$(".button-14").toggleClass("ext-close");
			$(".selectable").toggleClass("selectable");
			$(".selecttd").toggleClass("selecttd");
		}
		var col = $(this).index();
		$("table.table tbody tr").each(function (index, element) {
			if(col != 0 && col != 1 && col != 2) {
				if(!$(element).children("td").eq(col).hasClass("selectable")) {
					$(element).children("td").eq(col).toggleClass("selectable");
				};
			};
		});
	});
	// Клики по ячейкам с данными //
});
