from pathlib import Path

HTML = Path('public/index.html').read_text(encoding='utf-8')


def test_supabase_persistence_contract_markers():
    assert 'americano_tournaments' in HTML
    assert 'SUPABASE_URL' in HTML
    assert 'renderHome' in HTML
    assert 'Torneos activos' in HTML
    assert 'Torneos anteriores' in HTML
    assert 'data-action="open-tournament"' in HTML
    assert 'Finalizar torneo' in HTML


def test_does_not_depend_on_server_api_for_production_sync():
    assert 'api/state' not in HTML
    assert 'api.php' not in HTML


def test_viewer_admin_mode_markers():
    assert 'Modo solo lectura' in HTML
    assert 'x-admin-token' in HTML
    assert 'copy-view-link' in HTML
    assert 'copy-admin-link' in HTML
    assert 'Necesitás el link de administrador' in HTML
