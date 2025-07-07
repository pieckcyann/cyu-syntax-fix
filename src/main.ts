import { Plugin } from "obsidian";
import { markdown } from "@codemirror/lang-markdown";
import { styleTags, tags as t } from "@lezer/highlight";

export default class BoldAtPlugin extends Plugin {
	onload() {
		const AtBoldExtension = {
			inline: [
				{
					name: "AtBold",
					token: function (stream: any, state: any) {
						if (stream.match("@@")) {
							const start = stream.start;
							while (
								!stream.match("@@", false) &&
								!stream.eol()
							) {
								stream.next();
							}
							if (stream.match("@@")) {
								state.addNode("AtBold", start, stream.pos);
								return true;
							}
						}
						return false;
					},
				},
			],
			props: [
				styleTags({
					AtBold: t.strong,
				}),
			],
		};

		this.registerEditorExtension(
			markdown({ extensions: [AtBoldExtension] })
		);

		console.log("BoldAtPlugin loaded");
	}
}
