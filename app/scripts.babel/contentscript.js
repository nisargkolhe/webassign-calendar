'use strict';
var cal = ics();

$('.row.container > .rowLeft.container').each(function( index ) {
	var parsedDate, dateOut;
	var eventTitle, desc;

	$(this).children('p').children('strong').each(function(index){
		if(!($( this ).text() == 'Due:' || $( this ).text() == '(Homework)' || $( this ).text() == '(Final Exam)' || $( this ).text() == '(Quiz)')){
			var date = $(this).text();
			date = date.replace(/\s/g, '');
			//Tuesday,December6,201611:05PMEST
			parsedDate = moment(date,'ddd,MMMD,YYYYhh:mmA');
			dateOut = parsedDate.format('YYYYMMDD[T]HHmmss');

		}
	});

	var title = $(this).children('.heading-row').children('strong').html();
	
	if(title=='(Quiz)' || title.includes('Test')){
		task = $(this).children('.heading-row').html().substring(0,$(this).children('.heading-row').html().indexOf('<strong>'));
		$(this).children('p').each(function(index){
			if(!$(this).text().includes("<strong>")){
				desc = $(this).text();
			}
		});
		prefix = 'Test';
		eventTitle = prefix +': ' + task.trim();

	} else if(title.includes('Exam')){
		task = $(this).children('.heading-row').html().substring(0,$(this).children('.heading-row').html().indexOf('<strong>')).trim();
		desc = task;
		eventTitle = 'Exam: ' + task;

	} else{
		var task = $(this).children('.heading-row').children('a').html();
		var prefix = 'Due';
		eventTitle = prefix +': ' + task.substring(0,task.indexOf(':'));
		desc = task.substring(task.indexOf(':')+1);

	}

	$(this).append(' <a href="http://www.google.com/calendar/event?action=TEMPLATE&text='+eventTitle+'&dates='+dateOut+'/'+dateOut+ '&details='+desc+'&trp=false&sprop=&sprop=name:" target="_blank" rel="nofollow">Add to my calendar</a>');
});




