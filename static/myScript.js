var quill = new Quill('#editor-container', {
    modules: {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block']
        ]
    },

    placeholder: 'Compose an epic...',
    theme: 'snow'  // or 'bubble'
});

const tagContainer = document.querySelector('.tag-container');
const input3 = document.querySelector('.tag-container input');

let tags = [];

function createTag(label) {
  const div = document.createElement('div');
  div.setAttribute('class', 'tag');
  const span = document.createElement('span');
  span.innerHTML = label;
  const closeIcon = document.createElement('i');
  closeIcon.innerHTML = 'x';
  closeIcon.setAttribute('class', 'material-icons');
  closeIcon.setAttribute('data-item', label);
  div.appendChild(span);
  div.appendChild(closeIcon);
  return div;
}

function clearTags() {
  document.querySelectorAll('.tag').forEach(tag => {
    tag.parentElement.removeChild(tag);
  });
}

function addTags() {
  clearTags();
  tags.slice().reverse().forEach(tag => {
    tagContainer.prepend(createTag(tag));
  });
}

input3.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      e.target.value.split(',').forEach(tag => {
        tags.push(tag);  
      });
      
      addTags();
      input3.value = '';
    }
});
document.addEventListener('click', (e) => {
  console.log(e.target.tagName);
  if (e.target.tagName === 'I') {
    const tagLabel = e.target.getAttribute('data-item');
    const index = tags.indexOf(tagLabel);
    tags = [...tags.slice(0, index), ...tags.slice(index+1)];
    addTags();    
  }
})

input3.focus();

var aw2 = input2 = document.getElementById("tags");
new Awesomplete(input2, {

    list: [
		{ label: "POWER: 34.5kV Cable Problem includes PG&E, breaker issues,", value: "POWER" },
		{ label: "GEALOC: Gealoc Issue/Failure", value: "GEALOC" },
		{ label: "311: Doors not opening in ATO", value: "311" },
        { label: "IFO: Intermittent False Occupancy", value: "IFO" },
		{ label: "FO: Solid False Occupancy", value: "FO" },
		{ label: "HENCFIRE: Homeless encampment-related fire incident", value: "HENCFIRE" },
        { label: "HENCPD: Homeless encampment-related police incident", value: "HENCPD" },
		{ label: "TRESPASS: Unauthorized person walking wayside", value: "TRESPASS" },
		{ label: "FENCE: Hole/damage to wayside fence or open gate incident", value: "FENCE" },
        { label: "STRIKE: Individual struck wayside", value: "STRIKE" },
		{ label: "MUX: failure resulting in FO’s through entire MUX boundary", value: "MUX" },
		{ label: "MDRX: Medical incidents responded to by on-duty Medics (ie: Medic-16 & Medic-10)", value: "MDRX" },
        { label: "DERAIL: Derailment incident", value: "DERAIL" },
		{ label: "ZERO: Zero speed codes issue(s)", value: "ZERO" },
		{ label: "PLATTRIP: Platform trip activated", value: "PLATTRIP" },
		{ label: "CATA: Track-allocated Category A work area establishment (initial log entry only)", value: "CATA" },
        { label: "CATB: Track-allocated Category B work area establishment (initial log entry only)", value: "CATB" },
		{ label: "WORK: Non-Track allocated Category A or Category B work area establishment (initial log entry only)", value: "WORK" },
		{ label: "FIRE: Fire incident, non-encampment which affects mainline", value: "FIRE" },
        { label: "MEDPD: Medical incidents requiring employee response and/or BPD", value: "MEDPD" },
		{ label: "NETWRK: Network-related issue", value: "NETWRK" },
        { label: "PSFMP: Program stop failure resulting in cars outside platform, manual procedures authorized", value: "PSFMP" },
        { label: "PSFAER: Program stop failure resulting in cars outside aerial platform, continuing on without station stop", value: "PSFAER" },
        { label: "TRAP: Interlocking trap set incident", value: "TRAP" },
        { label: "COVERBD: Coverboard-related incident", value: "COVERBD" },
        { label: "INSPECT: Required track inspection incident (non-monitored switches, overnight work, etc)", value: "INSPECT" },
        { label: "WHIST: Unscheduled train stop at Yard requested by personnel", value: "WHIST" },
        { label: "MECH: Mechanical equipment incident (ie: car failure)", value: "MECH" },
        { label: "DBLDASH: Double dash incidents", value: "DBLDASH" },
        { label: "BOIP: Brake on in propulsion incidents", value: "BOIP" },
        { label: "FOTF: Miscellaneous FOTF mechanical failure incidents", value: "FOTF" },
        { label: "EM501: Emergency 501 taken by Train Operator", value: "EM501" },
        { label: "GRAFFITI: Graffiti-related incident", value: "GRAFFITI" },
        { label: "TRACK: Wayside anomaly incidents [ie: dip in rail, restricted speed area, cracked rail, switch issue]", value: "TRACK" },
        { label: "EMERG: Emergency incidents [ie: NBC, flooding, high wind, intrusion]", value: "EMERG" },
        { label: "RIDS: RIDS-related incidents", value: "RIDS" },
        { label: "SORS: SORS equipment failures", value: "SORS" },
        { label: "TCD: Track circuit dropout-related incident", value: "TCD" },
        { label: "EMEET: e-BART meet-related incident", value: "EMEET" },
        { label: "GMEET: Grand meet inciden", value: "GMEET" },
        { label: "OAC: Oakland Airport Connector incidents", value: "OAC" },
	],
    
    //list: ["POWER", "STRIKE", "DEBRIS", "MUX", "MDRX", "DERAIL", "ZERO"],
    minChars: 1,
    tabSelect: true,
    autoFirst: true,

    filter: function(text, input) {
		return Awesomplete.FILTER_CONTAINS(text, input.match(/[^ ]*$/)[0]);
	},

    item: function(text, input) {
		return Awesomplete.ITEM(text, input.match(/[^ ]*$/)[0]);
	},

	replace: function(text) {
		var before = this.input.value.match(/^.+ \s*|/)[0];
		this.input.value = before + text.value + " ";
	}
   
});

