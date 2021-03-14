document.getElementById('mode').addEventListener('click', () => {

    document.body.classList.toggle('dark');
    for (let element of document.getElementsByTagName('table')) {
      element.classList.toggle('table-dark');
    }
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  
  });
  
  if (localStorage.getItem('theme') != null && localStorage.getItem('theme') === 'light') {
  
    document.body.classList.remove('dark');
    for (let element of document.getElementsByTagName('table')) {
      element.classList.remove('table-dark')
    }
  
  }
  
  /* eslint-disable */
  var clipboard = new ClipboardJS('.btn-clipboard');
  
  clipboard.on('success', function(e) {
      /*
      console.info('Action:', e.action);
      console.info('Text:', e.text);
      console.info('Trigger:', e.trigger);
      */
  
      e.clearSelection();
  });
  
  clipboard.on('error', function(e) {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
  });
  /* eslint-enable */