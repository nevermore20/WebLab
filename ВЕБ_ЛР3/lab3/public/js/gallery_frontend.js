const updatePicturesTable = () => {
    $.get("/api/gallery/get")
        .then((result) => {
            $("#picture_cards").empty();
            for (let picture_id in result.data) {
                $.get("/api/gallery/card", {id: picture_id}).then((result) => {
                    $("#picture_cards").append(result);
                })
            }
        })
};

const updateParticipantsTable = () => {
    let table = $("#participant-table");
    $.get("/api/participant/get")
        .then((result) => {
            table.find("tr:gt(0)").remove();
            for (let picture_id in result.data) {
                table.find('tbody').append($('<tr>')
                    .append($('<td>').append(
                        result.data[picture_id].last_name,
                    ))
                    .append($('<td>').append(
                        result.data[picture_id].first_name,
                    ))
                    .append($('<td>').append(
                        result.data[picture_id].second_name,
                    ))
                    .append($('<td>').append(
                        result.data[picture_id].balance,
                    ))
                    .append($('<td>').append($('<a>')
                        .attr('href', '#')
                        .attr('onclick', `updateParticipantButtonClicked("${picture_id}")`)
                        .attr('href', '#')
                        .html('<i class=\'fa fa-pencil\' ></i>')
                    ).append($('<a>')
                        .attr('href', '#')
                        .attr('onclick', `deleteParticipantButtonClicked("${picture_id}")`)
                        .attr('href', '#')
                        .attr('style', 'padding-left: 5px')
                        .html('<i class=\'fa fa-trash\' ></i>')
                    ))
                )
            }
        })
};

const updateTable = () => {
    $("#picture_cards").length ? updatePicturesTable() : updateParticipantsTable();
};

const createPictureButtonClicked = () => openModalButtonClicked('/api/gallery/create');
const updatePictureButtonClicked = (id) => openModalButtonClicked('/api/gallery/update', {id});
const deletePictureButtonClicked = (id) => deleteButtonClicked('/api/gallery/delete', {id});

const createParticipantButtonClicked = () => openModalButtonClicked('/api/participant/create');
const updateParticipantButtonClicked = (id) => openModalButtonClicked('/api/participant/update', {id});
const deleteParticipantButtonClicked = (id) => deleteButtonClicked('/api/participant/delete', {id});

const openModalButtonClicked = (url, params) => {
    $.get(url, params).then((result) => {
        url += params ? '?' + $.param(params) : '';
        $("#form-modal").show();
        $("#form-modal-content").html(result);
        $("#form").attr('action', url);
    })
};

const deleteButtonClicked = (url, params) => {
    if (confirm('Вы действительно хотите удалить эту запись?')) {
        $.ajax({
            url: url + '?' + $.param(params),
            type: 'DELETE',
        }).then(() => {
            updateTable();
        })
    }
};
$(document).on("submit", "form#form", (e) => {
    e.preventDefault();
    let data = new FormData($("#form")[0]);
    $.ajax({
        type: "POST",
        url: $("#form").attr('action'),
        data: data,
        processData: false,
        contentType: false,
    }).then(() => {
        updateTable();
        $("#form-modal").hide();
    });
    return false;
});

updateTable();