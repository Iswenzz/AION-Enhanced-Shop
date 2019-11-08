var table_active = new Table();

(() =>
{
	if (!window.location.href.includes("shop/userdata/vault"))
		return;

	var navbar_container = getElementByXpath("//*[@id=\"navigation\"]/div/ul");
	var navbar = document.createElement("input");
	navbar.name = "searchTableString";
	navbar.classList.add("span2");
	navbar.classList.add("ui-autocomplete-input");
	navbar.type = "text";
	navbar.placeholder = "Search items";
	navbar.value = "";
	navbar.autocomplete = "off";

	navbar.addEventListener("input", () => 
	{
		getActiveTable();
		table_active.filterItems(navbar.value);
	});
	navbar_container.appendChild(navbar);

	setInterval(() => // Update table loop
	{
		getActiveTable();
		table_active.filterItems(navbar.value);
	}, 100);
})();

function getActiveTable()
{
	let table_iframe = getElementByXpath("//*[@id=\"content-frame\"]");
	let t = setInterval(() => // Loading table
	{
		let table_active_ul = getElementByXpath(
			"//div[contains(@class, 'categories') and contains(@class, 'active')]/ul",
			 table_iframe.contentWindow.document);
		if (table_active_ul != null) 
		{
			table_active.loadItems(table_active_ul);
			clearInterval(t);
		}
	}, 100);
}

function getElementByXpath(path, doc = document)
{
	return document.evaluate(path, doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
