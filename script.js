var validOutput = '';
var invalidOutput = '';

function handleFile() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];

    if (file) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var content = e.target.result;
            processContent(content);
        };

        reader.readAsText(file);
    } else {
        alert('Please choose a file.');
    }
}

function processContent(content) {
    var lines = content.split('\n');

    lines.forEach(function (line) {
        if (isValidLine(line)) {
            validOutput += line + '\n';
        } else {
            invalidOutput += line + '\n';
        }
    });

    // Display buttons only when the processing is done
    document.getElementById('downloadPlants').style.display = 'inline-block';
    document.getElementById('downloadEmployee').style.display = 'inline-block';
}

function isValidLine(line) {
    return line.trim().length === 4 && /^[A-Za-z]{2}\d{2}$/.test(line.trim());
}

function downloadPlants() {
    downloadFile(validOutput, 'plants.txt');
}

function downloadEmployee() {
    downloadFile(invalidOutput, 'employee.txt');
}

function downloadFile(output, filename) {
    var blob = new Blob([output], { type: 'text/plain' });
    var link = document.createElement('a');

    link.href = window.URL.createObjectURL(blob);
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
}
