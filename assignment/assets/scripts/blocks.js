$(document).ready(function () {
  $("#runBtn").click(function () {
    runcode();
  });
  $("#resetBtn").click(function () {
    reset();
  });
});
Blockly.Blocks['bot'] = {
  init: function() {
    this.appendStatementInput("bot")
        .setCheck(null)
        .appendField("BOT");
    this.appendDummyInput()
        .appendField("ASK ME QUESTION")
        .appendField(new Blockly.FieldDropdown([["What is the date today?","q1"], ["What is the time now?","q2"], ["How are you?","q3"]]), "question");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['bot'] = function(block) {
  var statements_bot = Blockly.JavaScript.statementToCode(block, 'bot');
  var dropdown_question = block.getFieldValue('question');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};
//Blockly.Blocks['bot_block'] = {
//  init: function() {
//    this.appendStatementInput("bot")
//        .setCheck(null)
//        .appendField("BOT");
//    this.setColour(230);
// this.setTooltip("");
// this.setHelpUrl("");
//  }
//};
//
//Blockly.JavaScript['bot_block'] = function(block) {
//  var statements_bot = Blockly.JavaScript.statementToCode(block, 'bot');
//  // TODO: Assemble JavaScript into code variable.
//  var code = `var inputTextValue ="${statements_bot}";
//`;
//  return code;
};
//
//Blockly.Blocks['dropdown_block'] = {
//  init: function() {
//    this.appendDummyInput()
//        .appendField("Ask me question")
//        .appendField(new Blockly.FieldDropdown([["What is the date today?","q1"], ["What is the time now?","q2"], ["How are you?","q3"], ["What is JavaScript?","q4"], ["What is your name?","q5"]]), "question");
//    this.setColour(230);
//    this.setTooltip("");
//    this.setHelpUrl("");
//  }
//};
//
Blockly.JavaScript['dropdown_block'] = function(block) {
  var dropdown_question = block.getFieldValue('question');
  var code =`
  if ("${dropdown_question}"=== "q1")
     {
     let today = new Date().toLocaleDateString()
      var inputTextValue = today;
      }

  else if ("${dropdown_question}"=== "q2")
     {
     var today = new Date();
     var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
     var inputTextValue = time;
     }

  else if ("${dropdown_question}"=== "q3")
    {
    var inputTextValue ="I am fine,Thanks";
    }

   else if ("${dropdown_question}"=== "q4")
    {
     var inputTextValue ="JavaScript is a scripting language that enables you to create dynamically updating content,control multimedia, animate images, and pretty much everything else";
    }

   else if ("${dropdown_question}"=== "q5")
    {
     var inputTextValue ="I am Bot";
     };
	`;
  return code;
};


var workspace = Blockly.inject("blocklyDiv", {
  media: "assets/media/",
  toolbox: document.getElementById("toolbox"),
});

function redrawUi() {
  if (typeof inputTextValue !== "undefined") {
    $("#inputBox").text(inputTextValue);
  } else {
    $("#inputBox").text("");
  }
}

function runcode() {
  // Generate JavaScript code and run it.
  var geval = eval;
  try {
    geval(Blockly.JavaScript.workspaceToCode(workspace));
  } catch (e) {
    console.error(e);
  }
  redrawUi();
}

function reset() {
  delete inputTextValue;
  redrawUi();
  alert ("Delecting All Blocks in Workspace");
  Blockly.mainWorkspace.clear();
}
