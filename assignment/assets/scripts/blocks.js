$(document).ready(function () {
  $("#runBtn").click(function () {
    runcode();
  });
  $("#resetBtn").click(function () {
    reset();
  });
});

Blockly.Blocks['bot_block'] = {
  init: function() {
    this.appendStatementInput("bot")
        .setCheck(null)
        .appendField("BOT");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['bot_block'] = function(block) {
  var statements_name = Blockly.JavaScript.statementToCode(block, 'bot');
   return statements_name
  // TODO: Assemble JavaScript into code variable.

};

Blockly.Blocks['dropdown_block'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Ask me question")
        .appendField(new Blockly.FieldDropdown([["What is the date today?","q1"], ["What is the time now?","q2"], ["How are you?","q3"], ["What is JavaScript?","q4"], ["What is your name?","q5"]]), "question");
    this.setColour(230);
    this.setPreviousStatement(true, null);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['dropdown_block'] = function(block) {
const allblocks = Blockly.getMainWorkspace().getAllBlocks();
const bot_blk=allblocks.find(blk => blk.type === "bot_block");
  var dp_block= bot_blk.getInputTargetBlock("bot");

  var dropdown_question =dp_block.getFieldValue('question');
  var answer;
  if (dropdown_question === "q1")
     {
     let today = new Date().toLocaleDateString()
      var answer = today;
      }

  else if (dropdown_question === "q2")
     {
     var today = new Date();
     var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
     var answer = time;
     }

  else if (dropdown_question === "q3")
    {
    var answer ="I am fine,Thanks";
    }

   else if (dropdown_question === "q4")
    {
     var answer ="JavaScript is a scripting language that enables you to create dynamically updating content,control multimedia, animate images, and pretty much everything else";
    }

   else if (dropdown_question === "q5")
    {
     var answer ="I am Bot";
     };
	 var code =`var inputTextValue = "${answer}";`;
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
