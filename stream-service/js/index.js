

var currentStream = -1
var MAX_LIST_ITEMS = 200

function onload () {
  var streamSelect = document.getElementById('streamSelect')
  for (var i = 0; i < streams.stream.length; i++) {
    var opt = streams.stream[i].name
    var li = document.createElement('li')
    var lia = document.createElement('a')
    lia.textContent = opt
    lia.value = opt
    lia.id = i
    lia.setAttribute('class', 'dropdown-item')
    lia.setAttribute('href', '#')
    li.appendChild(lia)
    streamSelect.appendChild(li)
  }

  $('.dropdown-menu li a').on('click', function () {
    var id = $(this).attr('id')
    onStreamSelect(id)
  })
}

function onStreamSelect (selectedStream) {
  if (selectedStream != currentStream) {
    currentStream = selectedStream
    document.getElementById('dropdownMenuLink').textContent =
        streams.stream[currentStream].name
    $('#description').html('' + streams.stream[currentStream].description)

    if (currentStream == 0) {
      onPause()
      return
    }

    switch (streams.stream[currentStream].id) {
      case 'callnetwork':
        for (let i = 0; i < calls.length; i++) {
          setTimeout(publishMessage,1000*(i+1), calls[i]);
        }
        break
    }
  }
}

function addFormattedMessageCallNetwork(call) {
  var li = document.createElement('li')
  li.setAttribute('class', 'list-group-item')
  var outputHtml = ''
  outputHtml +=
      "<b>Source: </b>Call Network <i class='fa-solid fa-phone fa-2xl' style='float:right'></i><br>"
  outputHtml += '<b>Outgoing Number: </b>' + call.outgoingNumber + '<br>'
  outputHtml += '<b>Incoming Number: </b>' + call.incomingNumber + '<br>'
  outputHtml += '<b>Call duration: </b>' + call.duration + '<br>'
  li.innerHTML = outputHtml

  var list = document.getElementById('messageList')
  list.insertBefore(li, list.firstChild)

  capElements()
}

function capElements () {
  var list = document.getElementById('messageList')
  if (list.childElementCount > MAX_LIST_ITEMS)
    list.removeChild(list.lastElementChild)
}