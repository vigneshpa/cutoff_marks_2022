import { html } from "https://deno.land/x/html/mod.ts";
import { minifyHTML } from "https://deno.land/x/minifier/mod.ts";

const raw_data = await Deno.readFile("source.json");
const decoder = new TextDecoder();
const data:Record<string, string>[] = JSON.parse(decoder.decode(raw_data));

const headings = [
    // "_id",
    "coc",
    "con",
    "brc",
    "brn",
    "OC",
    "BC",
    "BCM",
    "MBC",
    "SC",
    "SCA",
    "ST",
]

const heading_mapping = new Map<string, string>();

heading_mapping.set("coc", "College Code");
heading_mapping.set("con", "College Name");
heading_mapping.set("brc", "Branch Code");
heading_mapping.set("brn", "Branch Name");


const gen_html = html`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TNEA Colleges 2022</title>
        <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.0/dist/jquery.min.js"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tablesorter@2.31.3/dist/css/theme.bootstrap_4.min.css">
        <script src="https://cdn.jsdelivr.net/npm/tablesorter@2.31.3/dist/js/jquery.tablesorter.combined.min.js"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
        <style>
            thead > tr > th {
                cursor:pointer;
            }
        </style>
    </head>
    <body>
        <table id="college_table" class="table table-striped table-hover table-responsive">
            <thead class="thead-dark">
                <tr>
                    ${
                        headings.map(heading=>{

                            if(heading_mapping.has(heading))
                                return html`<th>${heading_mapping.get(heading)}</th>`;
                            return html`<th>${heading}</th>`;
                        }).join("")
                    }
                <tr>
            </thead>
            <tbody>
                ${
                    data.map(college=>html`
                        <tr>${
                            headings.map(heading=>html`
                                <td>${college[heading]}</td>
                            `).join("")
                        }</tr>
                    `).join("")
                }
            </tbody>
        </table>
        <script type="text/javascript">
            $("#college_table").tablesorter();
        </script>
    </body>
    </html>
`;

const encoder = new TextEncoder();

const ofile = minifyHTML(gen_html);

await Deno.writeFile("./index.html", encoder.encode(ofile));