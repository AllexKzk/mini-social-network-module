async function updateUsers(change, lib, id) {
    let role = $('#role' + id).val();
    let status = $('#status' + id).val();
    lib[id].role = role;
    lib[id].status = status;
    const user = lib[id];
    $.getJSON("/Data/users.json", full_lib => sendUpdate(full_lib, user, id));
}

async function sendUpdate(lib, user, id) {
    lib[id] = user;
    let response = await fetch('/edituser',{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(lib)
    });
}

function setUsers(lib) {
    for (let key in lib) {
        jQuery('<div>', {
            id: key,
            class: 'child-block',
        })
            .appendTo(document.body);
        if (lib[key].img)
            jQuery('<img>').attr('src', 'images/' + lib[key].img).appendTo('#' + key);
        else
            jQuery('<img>').attr('src', 'images/usr-def.png').appendTo('#' + key);
        jQuery('<div>', {
            id: 'text-block' + key,
            class: 'text-block',
        }).appendTo('#' + key);
        jQuery('<h2>').text(lib[key].name).appendTo('#text-block' + key);
        jQuery('<p>').text(lib[key].mail).appendTo('#text-block' + key);
        jQuery('<p>').text(lib[key].bday).appendTo('#text-block' + key);

        jQuery('<a>')
            .text('Друзья')
            .attr('href', '/friends-' + key)
            .appendTo('#' + key);

        jQuery('<a>')
            .text('Новости')
            .attr('href', '/news-' + key)
            .appendTo('#' + key);

        var roles = [
            {val: 1, text: 'Администратор'},
            {val: 2, text: 'Пользователь'},
            {val: 3, text: 'Модератор'}
        ];

        var role_select = $('<select>')
            .addClass('round')
            .attr('id', 'role' + key)
            .appendTo('#' + key);
        $(roles).each(function () {
            role_select.append($("<option>").attr('value', this.val).text(this.text));
        });
        role_select.val(lib[key].role).change();
        role_select.change(change => updateUsers(change, lib, key))

        var status = [
            {val: 1, text: 'Активный'},
            {val: 2, text: 'Заблокированный'},
            {val: 3, text: 'Не подтверждён'}
        ];

        var status_select = $('<select>')
            .addClass('round')
            .attr('id', 'status' + key)
            .appendTo('#' + key);
        $(status).each(function () {
            status_select.append($("<option>").attr('value', this.val).text(this.text));
        });
        status_select.val(lib[key].status).change();
        status_select.change(change => updateUsers(change, lib, key));

        jQuery('<button>')
            .attr('class', 'edit-button')
            .attr('id', 'btn' + key)
            .click(function() {
                $("#dialog" + key).dialog("open");
            })
            .appendTo('#' + key);
        jQuery('<span>')
            .attr('class', 'fa fa-pencil-square-o fa-2x')
            .attr('aria-hidden', 'true')
            .appendTo('#btn' + key)
        openDialog(key, lib);
    }
}

function openDialog(id, lib) {
    let dialog = jQuery('<div>')
        .attr('title', 'Редактирование')
        .attr('class', 'edit-dialog')
        .attr('id', 'dialog' + id)
        .draggable()
        .appendTo(document.body)
        .dialog({
            autoOpen: false,
            show: {
                effect: "blind",
                duration: 1000
            },
            hide: {
                effect: "blind",
                duration: 1000
            }
        });
    jQuery('<form>')
        .attr('id', 'form' + id)
        .appendTo(dialog);
    //IMG:
    let imgSrc = 'usr-def.png';
    if (lib[id].img)
        imgSrc = lib[id].img;
    let input = jQuery('<input>')
        .attr('type', 'file')
        .attr('style', 'visibility: hidden;')
        .attr('value', '')
        .attr('name', 'avatar')
        .appendTo('#form' + id);
    img = jQuery('<img>')
        .attr('src', 'images/' + imgSrc)
        .attr('class', 'avatar')
        .on('click', function(){
            input.trigger("click");
        })
        .appendTo('#form' + id);
    jQuery('<span>')
        .attr('class', 'fa fa-pencil-square-o fa-2x')

    //ID
    jQuery('<input>')
        .attr('value', id)
        .attr('name', 'id')
        .attr('style', 'visibility: hidden;')
        .appendTo('#form' + id);
    //NAME:
    jQuery('<label>')
        .text('\nИмя:')
        .attr('for', 'userName' + id)
        .appendTo('#form' + id);
    jQuery('<input>')
        .attr('name', 'userName')
        .attr('value', lib[id].name)
        .attr('id', 'userName' + id)
        .appendTo('#form' + id);
    //DATE:
    jQuery('<label>')
        .text('\nДата рождения: ')
        .attr('for', 'date' + id)
        .appendTo('#form' + id);
    jQuery('<input>')
        .attr('name', 'date')
        .attr('id', 'date' + id)
        .attr('type', 'date' )
        .attr('value', lib[id].bday)
        .appendTo('#form' + id);
    //MAIL:
    jQuery('<label>')
        .text('\nПочта: ')
        .attr('for', 'mail' + id)
        .appendTo('#form' + id);
    jQuery('<input>')
        .attr('name', 'mail')
        .attr('id', 'mail' + id)
        .attr('type', 'email' )
        .attr('value', lib[id].mail)
        .appendTo('#form' + id);
    //BTN:
    jQuery('<button>')
        .text('Принять')
        .click(function(event) {
            event.preventDefault();
            $.ajax({
                url: "/",
                type: "PUT",
                dataType: "JSON",
                data: new FormData($('#form' + id)[0]),
                processData: false,
                contentType: false
            });
            $('#dialog' + id).dialog('close');
            location.reload();
        })
        .appendTo('#form' + id);
}