$(document).ready(() => {

    $('#table').on('input', () => {
        let entryContent = $('#table').val();
        let entries = getEntries(entryContent);
        //checking if the getEntries function found an invlalid date
        if (entries === null) {
            showErrorHideTime();
        } else if (entryContent.length === 0) {
            hideTimeShowTips();
        } else {
            setTimeMessages(entries);
        }
    });

    //transforms string entry data into array of entries
    getEntries = (entryData) => {
        let entries = entryData.split('\t');
        entries = entries.filter(x => x.trim() !== '' && +x.trim() !== 0).map(x => +x.trim());
        for (let i = 0; i < entries.length; ++i) {
            if (isNaN(entries[i])) {
                return null;
            }
        }
        return entries;
    }

    setTimeMessages = (entries) => {
        let sum = entries.reduce((a, b) => a + b, 0);
        let days = entries.length;
        let time_limit = 7.5;
        if (!document.getElementById('toggle-mode').checked) {
            time_limit = 4;
        }
        let overtime = sum - (time_limit * days);
        let underworked = true;
        if (overtime >= 0) {
            underworked = false;
        }
        overtime = Math.abs(overtime);
        let hours = Math.floor(overtime);
        let rest = overtime - hours;
        let minutes = Math.floor(rest * 60);
        rest = rest - minutes / 60;
        let seconds = Math.floor(rest * 60);
        $('#time-overtime').html(`${underworked ? '-' : ''}${pad(hours, 2)}H ${pad(minutes, 2)}m ${pad(seconds, 2)}s`);
        showTimeHideTips();
    }

    pad = (num, size) => {
        let s = num + '';
        while (s.length < size) {
            s = '0' + s;
        }
        return s;
    }

    toggleEvent = () => {
        $('#table').val('');
        hideTimeShowTips();
    }

    showTimeHideTips = () => {
        document.getElementById('time-stats').style.display = 'flex';
        document.getElementById('paste-stats').style.display = 'none';
        document.getElementById('error-stats').style.display = 'none';
    }

    hideTimeShowTips = () => {
        document.getElementById('paste-stats').style.display = 'flex';
        document.getElementById('time-stats').style.display = 'none';
        document.getElementById('error-stats').style.display = 'none';
    }

    showErrorHideTime = () => {
        document.getElementById('time-stats').style.display = 'none';
        document.getElementById('paste-stats').style.display = 'none';
        document.getElementById('error-stats').style.display = 'flex';
    }

});