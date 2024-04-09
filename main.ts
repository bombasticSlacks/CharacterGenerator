import CharacterGenerator from "Character-Generator/public/generator";
import { Editor, MarkdownView, Plugin } from "obsidian";

export default class CharacterGeneratorPlugin extends Plugin {
	generator = new CharacterGenerator();

	async onload() {
		// initialize the generator
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: "character-generator-command",
			name: "Generate Character",
			editorCallback: (editor: Editor, view: MarkdownView) => {
				editor.replaceRange(this.generatePerson(), editor.getCursor());
			},
		});
	}

	generatePerson(): string {
		const character = this.generator.generate();

		return `### ${character.name} (${this.generator.convertPronouns(
			character.pronouns
		)})\n* Culture: ${character.culture}.\n* Appearance: ${
			character.appearance
		}. \n* Demeanour: ${character.demeanor}.\n* Goal: ${
			character.goal
		}.\n* Quirk: ${character.quirk}.`;
	}

	onunload() {}
}
