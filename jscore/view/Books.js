/**
 * Список книг
 */

Ext.define('Swan.view.Books', {
	extend: 'Ext.grid.Panel',
	id: 'booksgrid',
	plugins: [{
		ptype:'cellediting',
		clicksToEdit: 2
	}],
	
	
	listeners: {
        edit: function(editor, e) {
            let record = e.record;
            Ext.Ajax.request({
				url: 'index.php/Book/editBook',
				method: 'POST',
				
				jsonData: record.data,
				success: function(response, opts) {
					if(response.responseText) {
						Ext.Msg.alert('Success');
					} else {
						Ext.Msg.alert('Failed');
					}
					setTimeout(() => {
						Ext.Msg.close();
					}, 1500)
				},
				failure: function() {
				}
			});
		},
		initComponent: function() {
			var store = this.store;
		},
    },
	store: {
		proxy: {
			type: 'ajax',
			url: 'index.php/Book/loadList',
			reader: {
				type: 'json',
				idProperty: 'book_id'
			}
		},
		autoLoad: true,
		remoteSort: false,
		sorters: [{
			property: 'book_name',
			direction: 'ASC'
		}]
	},
	defaultListenerScope: true,
	tbar: [{
		text: 'Добавить',
		handler: function() {
			var win = new Ext.Window({
				title: "Добавить книгу",
				border: false,
				width: 400,
				height: 300,
				padding: '20 30 0 30',
				layout:'fit',
				items: [
					Ext.create('Ext.form.Panel', {
							url: 'index.php/Book/addBook',
							border: false,
							items: [{
								xtype: 'textfield',
								name: 'author_name',
								regex: /[а-яА-Яa-zA-Z\s.-]/,
								fieldLabel: 'Автор'
							},{
								xtype: 'textfield',
								name: 'book_name',
								regex: /[а-яА-Яa-zA-Z\s.?!-]/,
								fieldLabel: 'Название книги'
							},{
								xtype: 'textfield',
								regex: /^[12][0-9]{3}$/,
								name: 'book_year',
								fieldLabel: 'Год издания'
							}],
							buttons: [
								{
									text: 'Submit',
									handler: function() {
										var form = this.up('form'); 
										if (form.isValid()) { 
											form.submit({
												success: function(form, action) {
												   Ext.Msg.alert('Success', action.result.msg);
												   win.close();
												   setTimeout(() => {
													   Ext.Msg.close();
												   }, 1500);
												},
												failure: function(form, action) {
													Ext.Msg.alert('Failed', action.result.msg);
												}
											});
										} else { 
											Ext.Msg.alert('Invalid Data', 'Please correct form errors.')
										}
									}
								}
							]
						})
				]
			 });
			
			win.show();
			
		}
	}, {
		text: 'Удалить',
		handler: function() {
			
			var grid = Ext.getCmp('booksgrid');
			var selection = grid.getView().getSelectionModel().getSelection()[0];
			if(selection) {
				Ext.Ajax.request({
					url: 'index.php/Book/deleteBook',
					method: 'POST',
					jsonData: { id: selection.data.id },
					success: function(response, opts) {
						if(response.responseText) {
							grid.store.remove(selection);
							Ext.Msg.alert('Success');
						} else {
							Ext.Msg.alert('Failed');
						}
						setTimeout(() => {
							Ext.Msg.close();
						}, 1500)
					},
					failure: function() {
					}
				});
			}
		}
		
	}, {
		text: 'Экспорт в XML',
		handler: function() {

			Ext.Ajax.request({
				url: 'index.php/Book/exportBooks',
				method: 'GET',
				success: function(response, opts) {
						Ext.create('Ext.window.Window', {
							title: 'Экспорт в XML',
							height: 400,
							width: 600,
							layout: 'fit',
							items: {
								anchor: '100%',
								height: 200,
								xtype: 'textarea',
								readOnly: true,
								value: response.responseText
							}
						}).show();
				},
				failure: function() {
				}
			});

			
		}
	}],
	columns: [{
		dataIndex: 'author_name',
		text: 'Автор',
		width: 150,
		editor: {
			xtype: 'textfield',
			allowBlank: false
		}
	}, {
		dataIndex: 'book_name',
		text: 'Название книги',
		flex: 1,
		editor: {
			xtype: 'textfield',
			allowBlank: false
		}
	}, {
		dataIndex: 'book_year',
		text: 'Год издания',
		width: 150,
		editor: {
			xtype: 'textfield',
			allowBlank: false
		}
	}]
});
